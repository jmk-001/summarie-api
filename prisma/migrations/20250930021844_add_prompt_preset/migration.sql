/*
  Warnings:

  - You are about to drop the column `params` on the `SummaryJob` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idempotencyKey]` on the table `SummaryJob` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jobId]` on the table `SummaryResult` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paramsSnapshot` to the `SummaryJob` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schemaVersion` to the `SummaryJob` table without a default value. This is not possible if the table is not empty.
  - Made the column `jobId` on table `SummaryResult` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "example"."PromptVisibility" AS ENUM ('private', 'organization', 'public');

-- AlterEnum
ALTER TYPE "example"."Models" ADD VALUE 'gpt_mock';

-- AlterTable
ALTER TABLE "example"."SummaryJob" DROP COLUMN "params",
ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "idempotencyKey" TEXT,
ADD COLUMN     "paramsSnapshot" JSONB NOT NULL,
ADD COLUMN     "presetId" TEXT,
ADD COLUMN     "schemaVersion" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'queued';

-- AlterTable
ALTER TABLE "example"."SummaryResult" ALTER COLUMN "jobId" SET NOT NULL;

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
CREATE UNIQUE INDEX "SummaryResult_jobId_key" ON "example"."SummaryResult"("jobId");

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
