-- DropForeignKey
ALTER TABLE "WeddingOffer" DROP CONSTRAINT "WeddingOffer_userId_weddingOfferAuthor_fkey";

-- DropIndex
DROP INDEX "WeddingOffer_userId_idx";

-- CreateIndex
CREATE INDEX "WeddingOffer_userId_weddingOfferAuthor_idx" ON "WeddingOffer"("userId", "weddingOfferAuthor");

-- AddForeignKey
ALTER TABLE "WeddingOffer" ADD CONSTRAINT "WeddingOffer_userId_weddingOfferName_fkey" FOREIGN KEY ("userId", "weddingOfferName") REFERENCES "User"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;
