/*
  Warnings:

  - Made the column `producer_id` on table `farms` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "farms" DROP CONSTRAINT "farms_producer_id_fkey";

-- AlterTable
ALTER TABLE "farms" ALTER COLUMN "producer_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
