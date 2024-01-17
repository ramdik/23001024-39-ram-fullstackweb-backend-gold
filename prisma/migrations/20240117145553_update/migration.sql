-- DropIndex
DROP INDEX "WeddingOffer_userId_weddingOfferAuthor_key";

-- CreateIndex
CREATE INDEX "WeddingOffer_userId_weddingOfferAuthor_idx" ON "WeddingOffer"("userId", "weddingOfferAuthor");
