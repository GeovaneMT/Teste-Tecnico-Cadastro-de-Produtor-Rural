/*
  Warnings:

  - You are about to drop the column `producerId` on the `crops` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "crops" DROP CONSTRAINT "crops_producerId_fkey";

-- AlterTable
ALTER TABLE "crops" DROP COLUMN "producerId";
