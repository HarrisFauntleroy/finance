-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('info', 'warn', 'error', 'trace', 'debug');

-- CreateEnum
CREATE TYPE "ColorScheme" AS ENUM ('LIGHT', 'DARK', 'TBA');

-- CreateEnum
CREATE TYPE "MarketType" AS ENUM ('CRYPTOCURRENCY', 'STOCK', 'ETF', 'METAL', 'OTHER', 'CASH');

-- CreateEnum
CREATE TYPE "AccountConnection" AS ENUM ('NONE', 'SWYFTX', 'COINSPOT');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('LOAN', 'CASH', 'CUSTOM', 'MORTGAGE', 'PROPERTY', 'SECURITY', 'CREDIT_CARD', 'CRYPTOCURRENCY', 'SUPERANNUATION');

-- CreateTable
CREATE TABLE "Account" (
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

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "type" "LogType" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preferredColorScheme" "ColorScheme" DEFAULT 'LIGHT',
    "userCurrency" TEXT NOT NULL DEFAULT 'aud',
    "userLanguage" TEXT NOT NULL DEFAULT 'eng',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cryptocurrency" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "costBasis" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "realisedGain" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "apiKey" TEXT,
    "apiSecret" TEXT,
    "walletAddress" TEXT,
    "targetBalance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "interestBearingBalance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "incomeRate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "accountConnection" "AccountConnection" DEFAULT 'NONE',
    "marketId" TEXT,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Cryptocurrency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Market" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "description" TEXT,
    "currency" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "priceChange24h" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "priceChange24hPercent" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "marketCap" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "marketCapRank" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "type" "MarketType" NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Market_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Income" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "payFrequency" TEXT NOT NULL,
    "grossAmount" TEXT NOT NULL,
    "grossFrequency" TEXT NOT NULL DEFAULT 'P1Y0M0DT0H0M0S',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "BudgetAsset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "UserCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UserCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLabel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "assetId" TEXT,

    CONSTRAINT "UserLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioSnapshot" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "totalValue" DECIMAL(65,30) NOT NULL,
    "costBasis" DECIMAL(65,30) NOT NULL,
    "unrealisedGain" DECIMAL(65,30) NOT NULL,
    "realisedGain" DECIMAL(65,30) NOT NULL,
    "saleableValue" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PortfolioSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CryptoSnapshot" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "totalValue" DECIMAL(65,30) NOT NULL,
    "costBasis" DECIMAL(65,30) NOT NULL,
    "unrealisedGain" DECIMAL(65,30) NOT NULL,
    "realisedGain" DECIMAL(65,30) NOT NULL,
    "saleableValue" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CryptoSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashSnapshot" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "totalValue" DECIMAL(65,30) NOT NULL,
    "costBasis" DECIMAL(65,30) NOT NULL,
    "unrealisedGain" DECIMAL(65,30) NOT NULL,
    "realisedGain" DECIMAL(65,30) NOT NULL,
    "saleableValue" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CashSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertySnapshot" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "totalValue" DECIMAL(65,30) NOT NULL,
    "costBasis" DECIMAL(65,30) NOT NULL,
    "unrealisedGain" DECIMAL(65,30) NOT NULL,
    "realisedGain" DECIMAL(65,30) NOT NULL,
    "saleableValue" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PropertySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecuritySnapshot" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "totalValue" DECIMAL(65,30) NOT NULL,
    "costBasis" DECIMAL(65,30) NOT NULL,
    "unrealisedGain" DECIMAL(65,30) NOT NULL,
    "realisedGain" DECIMAL(65,30) NOT NULL,
    "saleableValue" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SecuritySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Log_id_key" ON "Log"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_id_key" ON "Settings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_id_userId_key" ON "Settings"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cryptocurrency_id_key" ON "Cryptocurrency"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Market_id_key" ON "Market"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Market_name_ticker_type_key" ON "Market"("name", "ticker", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Income_id_key" ON "Income"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Budget_id_key" ON "Budget"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetAsset_id_key" ON "BudgetAsset"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioSnapshot_id_key" ON "PortfolioSnapshot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioSnapshot_createdAt_userId_key" ON "PortfolioSnapshot"("createdAt", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoSnapshot_id_key" ON "CryptoSnapshot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoSnapshot_createdAt_userId_key" ON "CryptoSnapshot"("createdAt", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CashSnapshot_id_key" ON "CashSnapshot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CashSnapshot_createdAt_userId_key" ON "CashSnapshot"("createdAt", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertySnapshot_id_key" ON "PropertySnapshot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PropertySnapshot_createdAt_userId_key" ON "PropertySnapshot"("createdAt", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SecuritySnapshot_id_key" ON "SecuritySnapshot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SecuritySnapshot_createdAt_userId_key" ON "SecuritySnapshot"("createdAt", "userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cryptocurrency" ADD CONSTRAINT "Cryptocurrency_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cryptocurrency" ADD CONSTRAINT "Cryptocurrency_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Cryptocurrency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cryptocurrency" ADD CONSTRAINT "Cryptocurrency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetAsset" ADD CONSTRAINT "BudgetAsset_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLabel" ADD CONSTRAINT "UserLabel_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "UserCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioSnapshot" ADD CONSTRAINT "PortfolioSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoSnapshot" ADD CONSTRAINT "CryptoSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashSnapshot" ADD CONSTRAINT "CashSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertySnapshot" ADD CONSTRAINT "PropertySnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecuritySnapshot" ADD CONSTRAINT "SecuritySnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
