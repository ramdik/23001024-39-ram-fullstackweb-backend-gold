/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "WeddingOffer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "weddingOfferName" TEXT NOT NULL,
    "weddingOfferAuthor" TEXT NOT NULL,
    "weddingOfferPrice" INTEGER NOT NULL,
    "weddingOfferDescription" TEXT NOT NULL,
    "weddingOfferImg" TEXT NOT NULL,

    CONSTRAINT "WeddingOffer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WeddingOffer_userId_idx" ON "WeddingOffer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_name_key" ON "User"("id", "name");

-- AddForeignKey
ALTER TABLE "WeddingOffer" ADD CONSTRAINT "WeddingOffer_userId_weddingOfferAuthor_fkey" FOREIGN KEY ("userId", "weddingOfferAuthor") REFERENCES "User"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;
