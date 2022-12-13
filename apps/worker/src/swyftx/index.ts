import { SwyftxAsset, swyftxAssets } from "./assets";
import { Balance, swyftxBalance } from "./balance";
import { swyftxHistory, Transaction } from "./history";
import { refreshSwyftxToken, SwyftxJWT } from "./jwt";
import axios from "axios";
import { prisma } from "database";
import {
  AccountConnection,
  Cryptocurrency,
} from "database/generated/prisma-client";
import { Decimal } from "database/generated/prisma-client/runtime";

// import logger from "common/dist/src/helpers/logger"

const baseUrl = "https://api.swyftx.com.au";

interface SwyftxAccount {
  /** Database reference */
  id: string;
  /** Including send/receives, buy/sells & withdraw/deposits */
  balance: Balance[];
  history: Transaction[];
}

const body = JSON.stringify({ apiKey: process.env.SWYFTX_API_KEY });

/** Default GET request for Swyftx API, adds authorisation */
export const fetchFromSwyftx = async (url: string, accessToken: string) => {
  try {
    const response = await axios.get(baseUrl + url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
    });
    return response.data;
  } catch (err) {
    // You could log the error message here
    console.error(err);
  }
};

export const getApiKeyAndSecret = async (userId: string) =>
  prisma.cryptocurrency.findFirstOrThrow({
    where: {
      userId: userId,
      accountConnection: AccountConnection.SWYFTX,
    },
    select: {
      id: true,
      apiKey: true,
      apiSecret: true,
    },
  });

interface Secrets {
  id: string;
  apiKey: string | null;
  apiSecret: string | null;
}
/** Get complete Swyftx account including balances & transaction history */
export const getSwyftxAccount = async ({ id, apiKey }: Secrets) => {
  // Get JWT for Swyftx API
  const { accessToken }: SwyftxJWT = await refreshSwyftxToken(String(apiKey));

  // Swyftx assets list with IDs
  const assetsList: SwyftxAsset[] = await swyftxAssets(accessToken);

  // Current balance & staking balance from Swyftx
  const rawBalance: Balance[] = await swyftxBalance(accessToken);

  // Transaction history from Swyftx
  const transactions: Transaction[] = await swyftxHistory(accessToken);

  const balance = rawBalance?.map((item) => {
    const matchingAsset = assetsList.find(
      (asset) => Number(asset.id) === Number(item.assetId)
    );
    if (matchingAsset) {
      return {
        ...item,
        name: matchingAsset.name,
        marketId: matchingAsset.code,
      };
    }
    return item;
  });

  const history = transactions?.map((item) => {
    const matchingAsset = assetsList.find(
      (asset) => Number(asset.id) === Number(item.asset)
    );
    if (matchingAsset) {
      return {
        ...item,
        name: matchingAsset.name,
        marketId: matchingAsset.code,
      };
    }
    return item;
  });

  return {
    id,
    balance,
    history,
  };
};

const swyftx = async () => {
  const userIDs = await prisma.user.findMany({ select: { id: true } });

  const userIds = userIDs.map(({ id: userId }) => userId);

  const doSwyftx = async (userId: string) => {
    // First look for any connected swyftx accounts
    const secrets = await getApiKeyAndSecret(userId);
    // Get balances and history for those accounts
    const accounts = await getSwyftxAccount(secrets);

    // Format Swyftx response to fix schema
    const formattedData = accounts?.balance.map(
      ({
        name,
        availableBalance,
        stakingBalance,
        marketId,
        // TODO: add currency to this??? what?
      }): Omit<
        Cryptocurrency,
        "createdAt" | "updatedAt" | "id" | "currency"
      > => {
        return {
          userId,
          displayName: name,
          parentId: secrets?.id,
          marketId: marketId.toLowerCase(),
          interestBearingBalance: new Decimal(stakingBalance),
          balance: new Decimal(availableBalance).toDecimalPlaces(10),
          costBasis: new Decimal(0),
          targetBalance: new Decimal(0),
          rateOfIncome: new Decimal(0),
          realisedGain: new Decimal(0),
          apiKey: "",
          apiSecret: "",
          walletAddress: "",
          accountConnection: "NONE",
        };
      }
    );

    // Update the swyftx connected accounts children accounts
    const { Children } = await prisma.cryptocurrency.findFirstOrThrow({
      where: {
        userId,
        accountConnection: AccountConnection.SWYFTX,
      },
      select: {
        id: true,
        Children: {
          select: {
            id: true,
            marketId: true,
          },
        },
      },
    });

    formattedData?.map(async (data) => {
      // Check if a crypto of this kind already exists
      const existingCrypto = Children.find(
        (child) => child.marketId === data.marketId
      );

      try {
        await prisma.cryptocurrency.upsert({
          where: { id: existingCrypto?.id },
          // Update the existing crypto
          update: data,
          // Create if doesn't exist
          create: data,
        });
        // logger.info(data.marketId, data.balance)
      } catch (error) {
        // logger.error(error)
      }
    });
  };
  userIds.map((userId) => doSwyftx(userId));
};

export default swyftx;
