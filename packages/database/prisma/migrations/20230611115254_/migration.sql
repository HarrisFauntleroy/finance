/*
  Warnings:

  - A unique constraint covering the columns `[ticker,currency]` on the table `Market` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Market_ticker_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "Market_ticker_currency_key" ON "Market"("ticker", "currency");
