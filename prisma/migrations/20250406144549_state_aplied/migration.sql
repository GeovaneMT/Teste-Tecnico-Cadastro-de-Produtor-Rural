/*
  Warnings:

  - Changed the type of `state` on the `farms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "farms" DROP COLUMN "state",
ADD COLUMN     "state" "States" NOT NULL;
