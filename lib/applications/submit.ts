import { randomUUID } from "node:crypto";
import { isIP } from "node:net";
import type { Prisma } from "@prisma/client";
import { applicationDb } from "./db";
import { applicationConfig } from "./config";
import { encryptPayload, fingerprint } from "./crypto";
import type { ApplicationInput } from "./validation";

export class SubmissionError extends Error {
  constructor(public status: number, public code: string) { super(code); }
}
function networkIdentity(request: Request) {
  const hops = Number(process.env.APPLICATION_TRUSTED_PROXY_HOPS ?? 0);
  if (!Number.isInteger(hops) || hops < 1 || hops > 5) return "unattributed";
  const value = request.headers.get("x-forwarded-for") ?? "";
  if (value.length > 256) return "unattributed";
  const chain = value.split(",").map(part => part.trim());
  const address = chain[chain.length - hops];
  return address && isIP(address) ? address : "unattributed";
}
async function consume(tx: Prisma.TransactionClient, key: string, limit: number, expiresAt: Date) {
  const bucket = await tx.submissionRateBucket.upsert({ where: { key }, create: { key, expiresAt }, update: { count: { increment: 1 } } });
  if (bucket.count > limit) throw new SubmissionError(429, "RATE_LIMITED");
}

export async function submitApplication(input: ApplicationInput, idempotencyKey: string, request: Request) {
  const config = applicationConfig();
  const db = applicationDb();
  const idempotencyHash = fingerprint(`idempotency:${idempotencyKey}`);
  const payloadHash = fingerprint(JSON.stringify({ name: input.name, phone: input.phone, topic: input.topic, note: input.note, channel: input.channel, privacyVersion: input.privacyVersion }));
  const resultOfExisting = (existing: { reference: string; payloadHash: string | null }) => {
    if (existing.payloadHash !== payloadHash) throw new SubmissionError(409, "IDEMPOTENCY_CONFLICT");
    return { reference: existing.reference, replayed: true };
  };
  const existing = await db.application.findUnique({ where: { idempotencyHash } });
  if (existing) return resultOfExisting(existing);
  const now = new Date();
  const minute = Math.floor(now.getTime() / 60000);
  const day = Math.floor(now.getTime() / 86400000);
  try {
    return await db.$transaction(async tx => {
      // Serialize the same operation across processes before consuming quotas.
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtextextended(${idempotencyHash}, 0))`;
      const committed = await tx.application.findUnique({ where: { idempotencyHash } });
      if (committed) return resultOfExisting(committed);
      await consume(tx, fingerprint(`network:${networkIdentity(request)}:${minute}`), 30, new Date((minute + 2) * 60000));
      await consume(tx, fingerprint(`phone:${input.phone}:${day}`), 3, new Date((day + 1) * 86400000));
      const reference = `UK-${randomUUID().replaceAll("-", "").toUpperCase()}`;
      await tx.application.create({ data: {
        reference, status: "NEW", channel: input.channel, topic: input.topic,
        encryptedPayload: encryptPayload(reference, { name: input.name, phone: input.phone, note: input.note }),
        idempotencyHash, payloadHash, privacyVersion: input.privacyVersion, acknowledgedAt: now,
        retentionUntil: new Date(now.getTime() + config.retentionDays * 86400000),
        events: { create: { kind: "CREATED", actor: "public-form", toStatus: "NEW" } },
        notification: { create: {} },
      } });
      return { reference, replayed: false };
    });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      const raced = await db.application.findUnique({ where: { idempotencyHash } });
      if (raced) return resultOfExisting(raced);
    }
    throw error;
  }
}
