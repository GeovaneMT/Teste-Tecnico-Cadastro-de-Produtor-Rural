-- AlterTable
ALTER TABLE "crops" ADD COLUMN     "owner_id" TEXT;

-- AddForeignKey
ALTER TABLE "crops" ADD CONSTRAINT "crops_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "producers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
