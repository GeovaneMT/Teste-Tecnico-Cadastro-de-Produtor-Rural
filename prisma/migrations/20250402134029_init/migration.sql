/*
  Warnings:

  - The values [PRODUCER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `arable_area` on the `farms` table. All the data in the column will be lost.
  - You are about to drop the column `cpfCnpj` on the `farms` table. All the data in the column will be lost.
  - You are about to drop the column `cultures` on the `farms` table. All the data in the column will be lost.
  - You are about to drop the column `producer_name` on the `farms` table. All the data in the column will be lost.
  - You are about to drop the column `total_area` on the `farms` table. All the data in the column will be lost.
  - You are about to drop the `farm_indicators` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `agricultural_area` to the `farms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farm_area` to the `farms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'ADMIN';
COMMIT;

-- DropForeignKey
ALTER TABLE "farms" DROP CONSTRAINT "farms_producer_id_fkey";

-- DropIndex
DROP INDEX "farms_cpfCnpj_key";

-- AlterTable
ALTER TABLE "farms" DROP COLUMN "arable_area",
DROP COLUMN "cpfCnpj",
DROP COLUMN "cultures",
DROP COLUMN "producer_name",
DROP COLUMN "total_area",
ADD COLUMN     "agricultural_area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "farm_area" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "farm_indicators";

-- CreateTable
CREATE TABLE "producers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crops" (
    "farm_id" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "type" "CropType" NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producers_user_id_key" ON "producers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "producers_email_key" ON "producers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "producers_document_key" ON "producers"("document");

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crops" ADD CONSTRAINT "crops_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
