-- AlterTable
ALTER TABLE "crops" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "farms" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "producers" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP NOT NULL;
