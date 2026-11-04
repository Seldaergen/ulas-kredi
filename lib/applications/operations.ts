import type { ApplicationStatus } from "@prisma/client";
import { applicationDb } from "./db";
import { decryptPayload } from "./crypto";

const transitions: Record<ApplicationStatus, ApplicationStatus[]> = {
  NEW: ["CONTACT_PENDING", "CLOSED"], CONTACT_PENDING: ["CONTACTED", "CLOSED"],
  CONTACTED: ["IN_REVIEW", "CLOSED"], IN_REVIEW: ["CONTACT_PENDING", "CONTACTED", "CLOSED"], CLOSED: [],
};
export function operatorId() {
  const actor = process.env.APPLICATION_OPERATOR_ID ?? "";
  if (!/^[a-z0-9_.-]{3,64}$/i.test(actor)) throw new Error("OPERATOR_ALIAS_REQUIRED");
  return actor;
}
export async function listApplications() {
  operatorId();
  return applicationDb().application.findMany({ take: 50, orderBy: { createdAt: "desc" }, select: { reference: true, status: true, channel: true, createdAt: true, erasedAt: true, notification: { select: { state: true, attemptCount: true, nextAttemptAt: true } } } });
}
export async function showApplication(reference: string, reveal = false) {
  const actor = operatorId();
  const db = applicationDb();
  const row = await db.application.findUniqueOrThrow({ where: { reference }, include: { events: { orderBy: { createdAt: "asc" } }, notification: { include: { attempts: true } } } });
  const payload = row.encryptedPayload ? decryptPayload(reference, row.encryptedPayload) : null;
  await db.applicationEvent.create({ data: { applicationId: row.id, kind: reveal ? "PII_VIEWED" : "SUMMARY_VIEWED", actor } });
  return { reference: row.reference, status: row.status, topic: row.topic, channel: row.channel, createdAt: row.createdAt, retentionUntil: row.retentionUntil, erasedAt: row.erasedAt, events: row.events,
    notification: row.notification ? { state: row.notification.state, attempts: row.notification.attempts.map(a => ({ number: a.number, status: a.status, errorCode: a.errorCode, startedAt: a.startedAt, finishedAt: a.finishedAt })) } : null,
    customer: payload && (reveal ? payload : { name: `${payload.name.slice(0, 1)}***`, phone: `+90******${payload.phone.slice(-4)}`, note: "[gizli]" }),
  };
}
export async function changeApplicationStatus(reference: string, status: ApplicationStatus) {
  const actor = operatorId();
  const db = applicationDb();
  return db.$transaction(async tx => {
    const row = await tx.application.findUniqueOrThrow({ where: { reference } });
    if (row.erasedAt || !transitions[row.status].includes(status)) throw new Error("INVALID_STATUS_TRANSITION");
    const changed = await tx.application.updateMany({ where: { id: row.id, status: row.status, erasedAt: null }, data: { status } });
    if (changed.count !== 1) throw new Error("CONCURRENT_STATUS_CHANGE");
    await tx.applicationEvent.create({ data: { applicationId: row.id, kind: "STATUS_CHANGED", actor, fromStatus: row.status, toStatus: status } });
    return { reference, status };
  });
}
export async function retryNotification(reference: string) {
  const actor = operatorId();
  return applicationDb().$transaction(async tx => {
    const row = await tx.application.findUniqueOrThrow({ where: { reference }, include: { notification: true } });
    const job = row.notification;
    if (row.erasedAt || !job || !["DEAD", "RETRY"].includes(job.state) || job.attemptCount >= 10) throw new Error("RETRY_NOT_ALLOWED");
    const changed = await tx.applicationNotification.updateMany({ where: { id: job.id, state: job.state, attemptCount: job.attemptCount }, data: { state: "PENDING", nextAttemptAt: new Date(), maxAttempts: Math.min(10, Math.max(job.maxAttempts, job.attemptCount + 1)) } });
    if (changed.count !== 1) throw new Error("CONCURRENT_NOTIFICATION_CHANGE");
    await tx.applicationEvent.create({ data: { applicationId: row.id, kind: "NOTIFICATION_RETRY_REQUESTED", actor } });
    return { reference, queued: true };
  });
}
export async function eraseApplication(reference: string) {
  const actor = operatorId();
  return applicationDb().$transaction(async tx => {
    const row = await tx.application.findUniqueOrThrow({ where: { reference } });
    await tx.applicationNotification.updateMany({ where: { applicationId: row.id }, data: { state: "CANCELLED", leaseToken: null, leaseUntil: null } });
    await tx.notificationAttempt.updateMany({ where: { notification: { applicationId: row.id }, status: "STARTED" }, data: { status: "UNKNOWN", errorCode: "DATA_ERASED", finishedAt: new Date() } });
    await tx.application.update({ where: { id: row.id }, data: { encryptedPayload: null, idempotencyHash: null, payloadHash: null, erasedAt: new Date(), status: "CLOSED", topic: "OTHER" } });
    await tx.applicationEvent.create({ data: { applicationId: row.id, kind: "PERSONAL_DATA_ERASED", actor, fromStatus: row.status, toStatus: "CLOSED" } });
    return { reference, erased: true };
  });
}
export async function purgeExpired() {
  operatorId();
  const db = applicationDb();
  const rows = await db.application.findMany({ where: { erasedAt: null, retentionUntil: { lte: new Date() } }, take: 100, select: { reference: true } });
  for (const row of rows) await eraseApplication(row.reference);
  await db.submissionRateBucket.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  return { erased: rows.length, moreMayRemain: rows.length === 100 };
}
