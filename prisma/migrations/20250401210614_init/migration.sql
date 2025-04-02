/*
  Warnings:

  - You are about to drop the `Crop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CropOnFarm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Farm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Producer` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'INSTRUCTOR');

-- DropForeignKey
ALTER TABLE "CropOnFarm" DROP CONSTRAINT "CropOnFarm_cropId_fkey";

-- DropForeignKey
ALTER TABLE "CropOnFarm" DROP CONSTRAINT "CropOnFarm_farmId_fkey";

-- DropForeignKey
ALTER TABLE "Farm" DROP CONSTRAINT "Farm_producerId_fkey";

-- DropTable
DROP TABLE "Crop";

-- DropTable
DROP TABLE "CropOnFarm";

-- DropTable
DROP TABLE "Farm";

-- DropTable
DROP TABLE "Producer";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
