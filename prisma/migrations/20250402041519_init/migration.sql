-- CreateEnum
CREATE TYPE "CropType" AS ENUM ('SOYBEANS', 'CORN', 'COTTON', 'COFFEE', 'SUGARCANE');

-- CreateTable
CREATE TABLE "farms" (
    "id" TEXT NOT NULL,
    "producer_id" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "producer_name" TEXT NOT NULL,
    "farm_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "total_area" DOUBLE PRECISION NOT NULL,
    "arable_area" DOUBLE PRECISION NOT NULL,
    "vegetation_area" DOUBLE PRECISION NOT NULL,
    "cultures" "CropType"[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farm_indicators" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "culture" "CropType" NOT NULL,
    "total_farms" INTEGER NOT NULL,
    "total_area" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "farm_indicators_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "farms_cpfCnpj_key" ON "farms"("cpfCnpj");

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
