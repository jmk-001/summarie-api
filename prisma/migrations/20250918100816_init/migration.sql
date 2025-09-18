-- CreateEnum
CREATE TYPE "example"."SummaryJobStatus" AS ENUM ('queued', 'running', 'done', 'error');

-- CreateEnum
CREATE TYPE "example"."Models" AS ENUM ('gpt_3_5_turbo', 'gpt_3_5_turbo_16k', 'gpt_4o_mini', 'gpt_4o_mini_2024_07_18');

-- CreateTable
CREATE TABLE "example"."User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example"."Document" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "sourceUrl" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example"."SummaryJob" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "documentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "error" TEXT,
    "status" "example"."SummaryJobStatus" NOT NULL,
    "params" JSONB NOT NULL,

    CONSTRAINT "SummaryJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example"."SummaryResult" (
    "id" TEXT NOT NULL,
    "jobId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "tokensUsed" INTEGER NOT NULL,
    "model" "example"."Models" NOT NULL,

    CONSTRAINT "SummaryResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "example"."User"("email");

-- AddForeignKey
ALTER TABLE "example"."Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "example"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
