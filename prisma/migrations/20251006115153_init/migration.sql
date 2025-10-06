-- CreateEnum
CREATE TYPE "example"."PromptVisibility" AS ENUM ('private', 'organization', 'public');

-- CreateEnum
CREATE TYPE "example"."SummaryJobStatus" AS ENUM ('queued', 'running', 'done', 'error');

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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "sourceUrl" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example"."PromptPreset" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "schemaVersion" INTEGER NOT NULL DEFAULT 1,
    "params" JSONB NOT NULL,
    "visibility" "example"."PromptVisibility" NOT NULL DEFAULT 'private',

    CONSTRAINT "PromptPreset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example"."SummaryJob" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "documentId" TEXT NOT NULL,
    "model" TEXT NOT NULL DEFAULT 'gpt-mock',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "status" "example"."SummaryJobStatus" NOT NULL DEFAULT 'queued',
    "error" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "idempotencyKey" TEXT,
    "presetId" TEXT,
    "schemaVersion" INTEGER NOT NULL,
    "paramsSnapshot" JSONB NOT NULL,

    CONSTRAINT "SummaryJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example"."SummaryResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "jobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "tokensUsed" INTEGER NOT NULL,
    "model" TEXT NOT NULL DEFAULT 'gpt-mock',

    CONSTRAINT "SummaryResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "example"."User"("email");

-- CreateIndex
CREATE INDEX "PromptPreset_createdAt_idx" ON "example"."PromptPreset"("createdAt");

-- CreateIndex
CREATE INDEX "PromptPreset_name_idx" ON "example"."PromptPreset"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SummaryJob_idempotencyKey_key" ON "example"."SummaryJob"("idempotencyKey");

-- CreateIndex
CREATE INDEX "SummaryJob_status_createdAt_idx" ON "example"."SummaryJob"("status", "createdAt");

-- CreateIndex
CREATE INDEX "SummaryJob_userId_createdAt_idx" ON "example"."SummaryJob"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "SummaryJob_presetId_idx" ON "example"."SummaryJob"("presetId");

-- CreateIndex
CREATE UNIQUE INDEX "SummaryJob_userId_idempotencyKey_key" ON "example"."SummaryJob"("userId", "idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "SummaryResult_jobId_key" ON "example"."SummaryResult"("jobId");

-- AddForeignKey
ALTER TABLE "example"."Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "example"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example"."PromptPreset" ADD CONSTRAINT "PromptPreset_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "example"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example"."SummaryJob" ADD CONSTRAINT "SummaryJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "example"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example"."SummaryJob" ADD CONSTRAINT "SummaryJob_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "example"."Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example"."SummaryJob" ADD CONSTRAINT "SummaryJob_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "example"."PromptPreset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "example"."SummaryResult" ADD CONSTRAINT "SummaryResult_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "example"."SummaryJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
