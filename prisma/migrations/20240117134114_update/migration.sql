/*
  Warnings:

  - A unique constraint covering the columns `[userId,weddingOfferAuthor]` on the table `WeddingOffer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "WeddingOffer" DROP CONSTRAINT "WeddingOffer_userId_weddingOfferName_fkey";

-- DropIndex
DROP INDEX "User_id_name_key";

-- DropIndex
DROP INDEX "WeddingOffer_userId_weddingOfferAuthor_idx";

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "WeddingOffer_userId_weddingOfferAuthor_key" ON "WeddingOffer"("userId", "weddingOfferAuthor");

-- AddForeignKey
ALTER TABLE "WeddingOffer" ADD CONSTRAINT "WeddingOffer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
