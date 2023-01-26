/*
  Warnings:

  - The values [SECURITY,CREDIT_CARD] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `value` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetAsset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserLabel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "user_color_scheme" AS ENUM ('LIGHT', 'DARK', 'TBA');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('CONNECTED', 'CONNECTION_FAILED', 'DISCONNECTED', 'PENDING_CONNECTION', 'ERROR', 'UNAUTHORIZED', 'MAINTENANCE', 'BLOCKED', 'UNKNOWN', 'ACTIVE', 'INACTIVE');

-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('LOAN', 'CASH', 'CUSTOM', 'MORTGAGE', 'PROPERTY', 'INVESTMENT', 'CREDIT', 'CRYPTOCURRENCY', 'SUPERANNUATION');
ALTER TABLE "Asset" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_userId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetAsset" DROP CONSTRAINT "BudgetAsset_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "CashSnapshot" DROP CONSTRAINT "CashSnapshot_userId_fkey";

-- DropForeignKey
ALTER TABLE "CryptoSnapshot" DROP CONSTRAINT "CryptoSnapshot_userId_fkey";

-- DropForeignKey
ALTER TABLE "Cryptocurrency" DROP CONSTRAINT "Cryptocurrency_userId_fkey";

-- DropForeignKey
ALTER TABLE "PortfolioSnapshot" DROP CONSTRAINT "PortfolioSnapshot_userId_fkey";

-- DropForeignKey
ALTER TABLE "PropertySnapshot" DROP CONSTRAINT "PropertySnapshot_userId_fkey";

-- DropForeignKey
ALTER TABLE "SecuritySnapshot" DROP CONSTRAINT "SecuritySnapshot_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserLabel" DROP CONSTRAINT "UserLabel_assetId_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "value",
ADD COLUMN     "account" "AccountConnection",
ADD COLUMN     "apiKey" TEXT,
ADD COLUMN     "apiSecret" TEXT,
ADD COLUMN     "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "costBasis" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "incomeRate" DECIMAL(65,30),
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "interestBearingBalance" DECIMAL(65,30),
ADD COLUMN     "marketId" TEXT,
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "realisedGain" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "status" "AssetStatus" DEFAULT 'ACTIVE',
ADD COLUMN     "targetBalance" DECIMAL(65,30),
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "walletAddress" TEXT,
ALTER COLUMN "category" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "totalBalance" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "BudgetAsset";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Settings";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserCategory";

-- DropTable
DROP TABLE "UserLabel";

-- DropTable
DROP TABLE "VerificationToken";

-- DropEnum
DROP TYPE "ColorScheme";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "user_accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "user_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "role" "user_role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_jwt" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "user_settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preferredColorScheme" "user_color_scheme" DEFAULT 'LIGHT',
    "userCurrency" TEXT NOT NULL DEFAULT 'aud',
    "userLanguage" TEXT NOT NULL DEFAULT 'eng',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetEnvelope" (
    "id" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "remainingAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "BudgetEnvelope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetTransaction" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "pricePerUnit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "baseCurrency" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "quantityFilled" DECIMAL(65,30),
    "fee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "valueInBaseCurrency" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "fromAsset" TEXT,
    "toAsset" TEXT NOT NULL,
    "market" TEXT NOT NULL,
    "transactionType" TEXT NOT NULL,
    "expiry" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imageName" TEXT,
    "imageId" TEXT,
    "budgetEnvelopeId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BudgetTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomAssetCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CustomAssetCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetLabel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "assetId" TEXT,

    CONSTRAINT "AssetLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetTransaction" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3),
    "pricePerUnit" DECIMAL(65,30),
    "baseCurrency" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "quantityFilled" DECIMAL(65,30),
    "fee" DECIMAL(65,30),
    "valueInBaseCurrency" DECIMAL(65,30),
    "fromAsset" TEXT,
    "toAsset" TEXT NOT NULL,
    "market" TEXT,
    "transactionType" TEXT NOT NULL,
    "expiry" TIMESTAMP(3),
    "status" TEXT,
    "transactionHash" TEXT,
    "description" TEXT,
    "memo" TEXT,
    "relatedAssetId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AssetTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_accounts_provider_providerAccountId_key" ON "user_accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "user_sessions_sessionToken_key" ON "user_sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_jwt_token_key" ON "user_jwt"("token");

-- CreateIndex
CREATE UNIQUE INDEX "user_jwt_identifier_token_key" ON "user_jwt"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_id_key" ON "user_settings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_userId_key" ON "user_settings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_id_userId_key" ON "user_settings"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetEnvelope_id_key" ON "BudgetEnvelope"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetTransaction_id_key" ON "BudgetTransaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AssetTransaction_id_key" ON "AssetTransaction"("id");

-- AddForeignKey
ALTER TABLE "user_accounts" ADD CONSTRAINT "user_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetEnvelope" ADD CONSTRAINT "BudgetEnvelope_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetTransaction" ADD CONSTRAINT "BudgetTransaction_budgetEnvelopeId_fkey" FOREIGN KEY ("budgetEnvelopeId") REFERENCES "BudgetEnvelope"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetTransaction" ADD CONSTRAINT "BudgetTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetLabel" ADD CONSTRAINT "AssetLabel_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CustomAssetCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetTransaction" ADD CONSTRAINT "AssetTransaction_relatedAssetId_fkey" FOREIGN KEY ("relatedAssetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetTransaction" ADD CONSTRAINT "AssetTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioSnapshot" ADD CONSTRAINT "PortfolioSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoSnapshot" ADD CONSTRAINT "CryptoSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashSnapshot" ADD CONSTRAINT "CashSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertySnapshot" ADD CONSTRAINT "PropertySnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecuritySnapshot" ADD CONSTRAINT "SecuritySnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cryptocurrency" ADD CONSTRAINT "Cryptocurrency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
