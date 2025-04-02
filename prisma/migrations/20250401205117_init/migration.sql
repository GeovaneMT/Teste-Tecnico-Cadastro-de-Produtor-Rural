-- CreateTable
CREATE TABLE "Producer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "arableArea" DOUBLE PRECISION NOT NULL,
    "vegetationArea" DOUBLE PRECISION NOT NULL,
    "producerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropOnFarm" (
    "farmId" TEXT NOT NULL,
    "cropId" TEXT NOT NULL,

    CONSTRAINT "CropOnFarm_pkey" PRIMARY KEY ("farmId","cropId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producer_document_key" ON "Producer"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Crop_name_key" ON "Crop"("name");

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropOnFarm" ADD CONSTRAINT "CropOnFarm_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropOnFarm" ADD CONSTRAINT "CropOnFarm_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
