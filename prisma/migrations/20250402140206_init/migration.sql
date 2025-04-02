/*
  Warnings:

  - You are about to drop the column `user_id` on the `producers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "farms" DROP CONSTRAINT "farms_producer_id_fkey";

-- DropIndex
DROP INDEX "producers_user_id_key";

-- AlterTable
ALTER TABLE "farms" ALTER COLUMN "producer_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "producers" DROP COLUMN "user_id";

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
