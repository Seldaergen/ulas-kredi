-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('PENDING', 'PUBLISHED', 'REJECTED');

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "QuestionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
