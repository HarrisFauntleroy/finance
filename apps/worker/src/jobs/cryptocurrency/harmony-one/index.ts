import { logger } from "common";
import { prisma } from "database";
import { MarketType } from "database/generated/prisma-client";

import { Progress } from "../../../util";

import { Harmony } from "@harmony-js/core";
import {
  ChainID,
  ChainType,
  fromWei,
  hexToNumber,
  isValidAddress,
  Units,
} from "@harmony-js/utils";
import dotenv from "dotenv";

dotenv.config();

const hmy = new Harmony("https://rpc.ankr.com/harmony", {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyTestnet,
});

export async function getBalance(walletAddress: string): Promise<string> {
  if (isValidAddress(walletAddress)) {
    const balance = await hmy.blockchain
      .getBalance({ address: walletAddress })
      .then((response) => {
        return response.result;
      });

    return fromWei(hexToNumber(balance), Units.one);
  }
  throw new Error("Invalid address!");
}

export async function updateHarmonyBalances() {
  // Get all cryptocurrencies with type 'crypto', market ID 'eth', and a non-null wallet address
  const cryptocurrencies = await prisma.cryptocurrency.findMany({
    where: {
      market: {
        type: MarketType.CRYPTOCURRENCY,
      },
      marketId: "one_CRYPTOCURRENCY",
      walletAddress: {
        not: null,
      },
    },
    select: {
      id: true,
      walletAddress: true,
    },
  });

  const progress = new Progress(cryptocurrencies.length);
  progress.start("Harmony ONE");

  // Iterate over the cryptocurrencies
  for (const cryptocurrency of cryptocurrencies) {
    try {
      // Get the account balance and linked transactions
      const balance = await getBalance(cryptocurrency.walletAddress as string);

      // const transactions = await getTransactionHistory(
      // 	cryptocurrency.walletAddress as string
      // )

      // Update the cryptocurrency in the database with the new balance and transactions
      await prisma.cryptocurrency.update({
        data: {
          balance,
          // transactions,
        },
        where: {
          id: cryptocurrency.id,
        },
      });

      progress.increment();
    } catch (error) {
      logger.error(error);
    }
  }

  progress.stop("Harmony ONE");

  return new Date();
}
