/*
  Warnings:

  - Made the column `farm_id` on table `crops` required. This step will fail if there are existing NULL values in that column.
  - Made the column `owner_id` on table `crops` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "crops" ALTER COLUMN "farm_id" SET NOT NULL,
ALTER COLUMN "owner_id" SET NOT NULL;
