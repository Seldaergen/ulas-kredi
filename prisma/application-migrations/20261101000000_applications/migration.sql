-- Dedicated, additive application migration. Legacy Q&A migrations are NOT run.
CREATE TYPE "ApplicationStatus" AS ENUM ('NEW', 'CONTACT_PENDING', 'CONTACTED', 'IN_REVIEW', 'CLOSED');
CREATE TYPE "SubmissionChannel" AS ENUM ('HERO_FORM', 'CONTACT_FORM');
CREATE TYPE "NotificationState" AS ENUM ('PENDING', 'SENDING', 'RETRY', 'SENT', 'DEAD', 'CANCELLED');
CREATE TYPE "NotificationAttemptStatus" AS ENUM ('STARTED', 'SUCCEEDED', 'FAILED', 'UNKNOWN');
CREATE TABLE "Application" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "reference" TEXT NOT NULL,
  "status" "ApplicationStatus" NOT NULL DEFAULT 'NEW',
  "channel" "SubmissionChannel" NOT NULL,
  "topic" TEXT NOT NULL,
  "encryptedPayload" TEXT,
  "idempotencyHash" TEXT,
  "payloadHash" TEXT,
  "privacyVersion" TEXT NOT NULL,
  "acknowledgedAt" TIMESTAMP(3) NOT NULL,
  "retentionUntil" TIMESTAMP(3) NOT NULL,
  "erasedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
CREATE UNIQUE INDEX "Application_reference_key" ON "Application"("reference");
CREATE UNIQUE INDEX "Application_idempotencyHash_key" ON "Application"("idempotencyHash");
CREATE INDEX "Application_status_createdAt_idx" ON "Application"("status", "createdAt");
CREATE INDEX "Application_retentionUntil_erasedAt_idx" ON "Application"("retentionUntil", "erasedAt");
CREATE TABLE "ApplicationEvent" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "applicationId" TEXT NOT NULL REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "kind" TEXT NOT NULL,
  "actor" TEXT NOT NULL,
  "fromStatus" "ApplicationStatus",
  "toStatus" "ApplicationStatus",
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "ApplicationEvent_applicationId_createdAt_idx" ON "ApplicationEvent"("applicationId", "createdAt");
CREATE TABLE "ApplicationNotification" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "applicationId" TEXT NOT NULL REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "state" "NotificationState" NOT NULL DEFAULT 'PENDING',
  "attemptCount" INTEGER NOT NULL DEFAULT 0,
  "maxAttempts" INTEGER NOT NULL DEFAULT 5,
  "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "leaseUntil" TIMESTAMP(3),
  "leaseToken" TEXT,
  "sentAt" TIMESTAMP(3)
);
CREATE UNIQUE INDEX "ApplicationNotification_applicationId_key" ON "ApplicationNotification"("applicationId");
CREATE INDEX "ApplicationNotification_state_nextAttemptAt_idx" ON "ApplicationNotification"("state", "nextAttemptAt");
CREATE TABLE "NotificationAttempt" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "notificationId" TEXT NOT NULL REFERENCES "ApplicationNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "number" INTEGER NOT NULL,
  "status" "NotificationAttemptStatus" NOT NULL DEFAULT 'STARTED',
  "errorCode" TEXT,
  "messageId" TEXT NOT NULL,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "finishedAt" TIMESTAMP(3)
);
CREATE UNIQUE INDEX "NotificationAttempt_notificationId_number_key" ON "NotificationAttempt"("notificationId", "number");
CREATE TABLE "SubmissionRateBucket" (
  "key" TEXT NOT NULL PRIMARY KEY,
  "count" INTEGER NOT NULL DEFAULT 1,
  "expiresAt" TIMESTAMP(3) NOT NULL
);
CREATE INDEX "SubmissionRateBucket_expiresAt_idx" ON "SubmissionRateBucket"("expiresAt");
