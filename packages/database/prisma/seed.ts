import { AssetStatus, MarketType } from "../generated/prisma-client";
import { prisma } from "../src";

const TEST_USER_ID = "test-user";
const TEST_MARKET_ID = "test_OTHER";
const CURRENCY = "AUD";

function createUser(id = TEST_USER_ID) {
  return {
    id,
    name: "Test User",
  };
}

function createMarket(id = TEST_MARKET_ID) {
  return {
    id,
    ticker: "TEST",
    currency: CURRENCY,
    type: MarketType.OTHER,
    name: "Test Market",
  };
}

function createAsset(userId = TEST_USER_ID) {
  return {
    id: `test-asset-${Math.random()}`,
    userId,
    name: `Test Asset ${Math.random()}`,
    marketId: TEST_MARKET_ID,
    status: AssetStatus.ACTIVE,
    currency: CURRENCY,
  };
}

function createTransction() {
  return {
    timestamp: new Date(),
    pricePerUnit: "100",
    baseCurrency: CURRENCY,
    quantity: "1",
    quantityFilled: "1",
    fee: "0",
    valueInBaseCurrency: "100",
    fromAsset: "btc",
    toAsset: CURRENCY,
    market: "btc",
    transactionType: "buy",
    expiry: new Date(),
    status: "filled",
    transactionHash: "test-transaction-hash",
    description: "test transaction",
    memo: "test memo",
    userId: TEST_USER_ID,
  };
}

async function addTestUser() {
  const user = createUser();

  await prisma.user.upsert({
    where: { id: user.id },
    create: user,
    update: user,
  });
}

async function addTestMarket(count = 1) {
  const markets = Array.from({ length: count }, createMarket);

  markets.forEach(async (data) => {
    try {
      console.log("Uploading market", data);
      await prisma.market.upsert({
        where: {
          id: data.id,
        },
        create: data,
        update: data,
      });
      console.log("Uploaded market", data);
    } catch (error) {
      console.error("Error uploading market", data, error);
    }
  });
}

async function addTestAssets(count = 4) {
  const assets = Array.from({ length: count }, createAsset);

  assets.forEach(async (data) => {
    try {
      console.log("Uploading asset", data);
      await prisma.asset.create({ data });
      console.log("Uploaded asset", data);
    } catch (error) {
      console.error("Error uploading asset", data, error);
    }
  });
}

async function addTestTransactions(count = 4) {
  const transactions = Array.from({ length: count }, createTransction);

  transactions.forEach(async (data) => {
    try {
      console.log("Uploading transaction", data);
      await prisma.assetTransaction.create({ data });
      console.log("Uploaded transaction", data);
    } catch (error) {
      console.error("Error uploading transaction", data, error);
    }
  });
}

async function main() {
  try {
    const userAssets = await prisma.asset.count({
      where: { userId: TEST_USER_ID },
    });
    const userTransactions = await prisma.assetTransaction.count({
      where: { userId: TEST_USER_ID },
    });
    const market = await prisma.market.count({
      where: { id: TEST_MARKET_ID },
    });

    if (userAssets) {
      console.log("Test user already exists");
    } else {
      console.log("Creating test user");
      addTestUser();
    }
    if (market) {
      console.log("Test market already exists");
    } else {
      console.log("Creating test market");
      addTestMarket();
    }
    if (userAssets) {
      console.log("Test assets already exist");
    } else {
      console.log("Creating test assets");
      addTestAssets();
    }
    if (userTransactions) {
      console.log("Test transactions already exist");
    } else {
      console.log("Creating test transactions");
      addTestTransactions();
    }
  } catch (error) {
    console.error("Error seeding database", error);
  }
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main();
