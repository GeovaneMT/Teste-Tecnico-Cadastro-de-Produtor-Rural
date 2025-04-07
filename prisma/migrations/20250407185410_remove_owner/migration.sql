/*
  Warnings:

  - You are about to drop the column `owner_id` on the `crops` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "crops" DROP CONSTRAINT "crops_owner_id_fkey";

-- AlterTable
ALTER TABLE "crops" DROP COLUMN "owner_id",
ADD COLUMN     "producerId" TEXT;

-- AddForeignKey
ALTER TABLE "crops" ADD CONSTRAINT "crops_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "producers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
