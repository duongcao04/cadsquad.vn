/*
  Warnings:

  - You are about to drop the column `horizontalThumbnailId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `verticalThumbnailId` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_horizontalThumbnailId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_verticalThumbnailId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "horizontalThumbnailId",
DROP COLUMN "verticalThumbnailId",
ADD COLUMN     "backgroundCoverId" TEXT,
ADD COLUMN     "thumbnailId" TEXT;

-- CreateTable
CREATE TABLE "ServiceBackgroundCover" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "ServiceThumbnailType" NOT NULL DEFAULT 'ImagePng',

    CONSTRAINT "ServiceBackgroundCover_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "ServiceThumbnail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_backgroundCoverId_fkey" FOREIGN KEY ("backgroundCoverId") REFERENCES "ServiceBackgroundCover"("id") ON DELETE SET NULL ON UPDATE CASCADE;
