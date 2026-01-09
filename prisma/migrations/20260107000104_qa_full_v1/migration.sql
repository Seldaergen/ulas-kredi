/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "QaStatus" AS ENUM ('PENDING', 'PUBLISHED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VoteValue" AS ENUM ('LIKE', 'DISLIKE');

-- DropTable
DROP TABLE "Question";

-- DropEnum
DROP TYPE "QuestionStatus";

-- CreateTable
CREATE TABLE "QaQuestion" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Genel',
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "QaStatus" NOT NULL DEFAULT 'PENDING',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "dislikeCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "QaQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QaAnswer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT true,
    "displayName" TEXT,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "dislikeCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QaAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QaQuestionVote" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "voterHash" TEXT NOT NULL,
    "value" "VoteValue" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QaQuestionVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QaAnswerVote" (
    "id" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "voterHash" TEXT NOT NULL,
    "value" "VoteValue" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QaAnswerVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QaQuestion_slug_key" ON "QaQuestion"("slug");

-- CreateIndex
CREATE INDEX "QaQuestion_status_idx" ON "QaQuestion"("status");

-- CreateIndex
CREATE INDEX "QaQuestion_category_idx" ON "QaQuestion"("category");

-- CreateIndex
CREATE INDEX "QaQuestion_isDeleted_idx" ON "QaQuestion"("isDeleted");

-- CreateIndex
CREATE INDEX "QaAnswer_questionId_idx" ON "QaAnswer"("questionId");

-- CreateIndex
CREATE INDEX "QaQuestionVote_questionId_idx" ON "QaQuestionVote"("questionId");

-- CreateIndex
CREATE INDEX "QaQuestionVote_value_idx" ON "QaQuestionVote"("value");

-- CreateIndex
CREATE UNIQUE INDEX "QaQuestionVote_questionId_voterHash_key" ON "QaQuestionVote"("questionId", "voterHash");

-- CreateIndex
CREATE INDEX "QaAnswerVote_answerId_idx" ON "QaAnswerVote"("answerId");

-- CreateIndex
CREATE INDEX "QaAnswerVote_value_idx" ON "QaAnswerVote"("value");

-- CreateIndex
CREATE UNIQUE INDEX "QaAnswerVote_answerId_voterHash_key" ON "QaAnswerVote"("answerId", "voterHash");

-- AddForeignKey
ALTER TABLE "QaAnswer" ADD CONSTRAINT "QaAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QaQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QaQuestionVote" ADD CONSTRAINT "QaQuestionVote_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QaQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QaAnswerVote" ADD CONSTRAINT "QaAnswerVote_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "QaAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
