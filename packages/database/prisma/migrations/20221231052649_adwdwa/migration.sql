/*
  Warnings:

  - A unique constraint covering the columns `[ticker,type]` on the table `Market` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Market_name_ticker_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "Market_ticker_type_key" ON "Market"("ticker", "type");
