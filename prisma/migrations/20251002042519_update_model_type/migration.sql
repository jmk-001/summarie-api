/*
  Warnings:

  - The `model` column on the `SummaryResult` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "example"."SummaryJob" ADD COLUMN     "model" TEXT NOT NULL DEFAULT 'gpt-mock';

-- AlterTable
ALTER TABLE "example"."SummaryResult" DROP COLUMN "model",
ADD COLUMN     "model" TEXT NOT NULL DEFAULT 'gpt-mock';

-- DropEnum
DROP TYPE "example"."Models";
