import { randomUUID } from "node:crypto";
import { Prisma } from "@prisma/client";
import nodemailer from "nodemailer";
import { z } from "zod";
import { applicationDb } from "./db";

async function claim() {
  const db = applicationDb();
  return db.$transaction(async tx => {
    const rows = await tx.$queryRaw<{ id: string }[]>(Prisma.sql`
      SELECT "id" FROM "ApplicationNotification"
      WHERE (("state" IN ('PENDING', 'RETRY') AND "nextAttemptAt" <= NOW())
        OR ("state" = 'SENDING' AND "leaseUntil" <= NOW()))
      ORDER BY "nextAttemptAt", "id" FOR UPDATE SKIP LOCKED LIMIT 1`);
    if (!rows[0]) return null;
    const job = await tx.applicationNotification.findUniqueOrThrow({ where: { id: rows[0].id }, include: { application: { select: { reference: true, erasedAt: true, retentionUntil: true } } } });
    if (job.state === "SENDING") await tx.notificationAttempt.updateMany({ where: { notificationId: job.id, status: "STARTED" }, data: { status: "UNKNOWN", errorCode: "LEASE_EXPIRED", finishedAt: new Date() } });
    if (job.application.erasedAt || job.application.retentionUntil <= new Date() || job.attemptCount >= job.maxAttempts) {
      const state = job.application.erasedAt || job.application.retentionUntil <= new Date() ? "CANCELLED" : "DEAD";
      await tx.applicationNotification.update({ where: { id: job.id }, data: { state, leaseToken: null, leaseUntil: null } });
      await tx.applicationEvent.create({ data: { applicationId: job.applicationId, kind: `NOTIFICATION_${state}`, actor: "notification-worker" } });
      return null;
    }
    const token = randomUUID();
    const number = job.attemptCount + 1;
    const messageId = `<application-${job.application.reference}@ulaskredi.com.tr>`;
    await tx.applicationNotification.update({ where: { id: job.id }, data: { state: "SENDING", attemptCount: number, leaseToken: token, leaseUntil: new Date(Date.now() + 120000) } });
    const attempt = await tx.notificationAttempt.create({ data: { notificationId: job.id, number, messageId } });
    return { id: job.id, applicationId: job.applicationId, reference: job.application.reference, token, number, maxAttempts: job.maxAttempts, messageId, attemptId: attempt.id };
  });
}

async function send(reference: string, messageId: string) {
  const host = process.env.APPLICATION_SMTP_HOST;
  const port = Number(process.env.APPLICATION_SMTP_PORT);
  const to = z.string().email().max(254).safeParse(process.env.APPLICATION_NOTIFICATION_TO);
  const from = z.string().email().max(254).safeParse(process.env.APPLICATION_NOTIFICATION_FROM);
  const local = process.env.APPLICATION_ALLOW_LOCAL === "true" && ["localhost", "127.0.0.1", "::1"].includes(host ?? "");
  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !to.success || !from.success ||
      (!local && (!process.env.APPLICATION_SMTP_USER || !process.env.APPLICATION_SMTP_PASS))) throw new Error("SMTP_CONFIGURATION_REQUIRED");
  const transport = nodemailer.createTransport({
    host, port, secure: port === 465, requireTLS: !local && port !== 465,
    auth: local ? undefined : { user: process.env.APPLICATION_SMTP_USER!, pass: process.env.APPLICATION_SMTP_PASS! },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
    disableFileAccess: true, disableUrlAccess: true, logger: false, debug: false,
  });
  try {
    const result = await transport.sendMail({ from: from.data, to: to.data, messageId, subject: `Ulaş Kredi | Başvuru ${reference}`, text: `Yeni danışmanlık başvurusu kaydedildi.\nReferans: ${reference}\nYetkili yerel yönetim akışından takip edin.\nBu bildirim kişisel başvuru bilgilerini içermez.` });
    if (!result.accepted?.length || result.rejected?.length) throw new Error("SMTP_REJECTED");
  } finally { transport.close(); }
}

export async function processNotifications(limit = 10) {
  if (!Number.isInteger(limit) || limit < 1 || limit > 20) throw new Error("INVALID_BATCH_LIMIT");
  const results: { reference: string; outcome: string }[] = [];
  for (let i = 0; i < limit; i++) {
    const job = await claim();
    if (!job) break;
    let sent = false;
    try { await send(job.reference, job.messageId); sent = true; } catch { /* Never persist raw SMTP exceptions. */ }
    const db = applicationDb();
    await db.$transaction(async tx => {
      const changed = await tx.applicationNotification.updateMany({ where: { id: job.id, state: "SENDING", leaseToken: job.token }, data: {
        state: sent ? "SENT" : job.number >= job.maxAttempts ? "DEAD" : "RETRY",
        sentAt: sent ? new Date() : null, leaseToken: null, leaseUntil: null,
        nextAttemptAt: new Date(Date.now() + Math.min(3600000, 60000 * 2 ** (job.number - 1))),
      } });
      if (changed.count !== 1) return;
      await tx.notificationAttempt.update({ where: { id: job.attemptId }, data: { status: sent ? "SUCCEEDED" : "FAILED", errorCode: sent ? null : "SMTP_UNAVAILABLE", finishedAt: new Date() } });
      await tx.applicationEvent.create({ data: { applicationId: job.applicationId, kind: sent ? "NOTIFICATION_SENT" : "NOTIFICATION_FAILED", actor: "notification-worker" } });
    });
    results.push({ reference: job.reference, outcome: sent ? "SENT" : "FAILED" });
  }
  return results;
}
