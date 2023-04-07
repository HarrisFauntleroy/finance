import { logger } from 'common';
import { prisma } from 'database';
import { MarketType } from 'database/generated/prisma-client';

import { Progress } from '../../../util';
import { getBalance } from './getBalance';
import { createWeb3Instance } from './web3';

import dotenv from 'dotenv';

dotenv.config();

const web3 = createWeb3Instance();

type TransactionHistory = {
  blockNumber: number | null;
  from: string;
  to: string | null;
  value: string;
  status: boolean;
};

export async function getTransactionHistory(
  walletAddress: string,
): Promise<TransactionHistory[]> {
  const transactionCount = await web3.eth.getTransactionCount(walletAddress);

  const transactionHistory = [];

  for (let i = 0; i < transactionCount; i++) {
    const receipt = await web3.eth.getTransactionReceipt(walletAddress);

    if (!receipt) continue;

    const transaction = await web3.eth.getTransaction(receipt.transactionHash);

    transactionHistory.push({
      blockNumber: transaction.blockNumber,
      from: transaction.from,
      to: transaction.to,
      value: web3.utils.fromWei(transaction.value, 'ether'),
      status: receipt.status,
    });
  }

  return transactionHistory;
}

export async function updateEthereumBalances() {
  const ethereumAccounts = await prisma.asset.findMany({
    where: {
      market: {
        type: MarketType.CRYPTOCURRENCY,
      },
      marketId: 'eth_CRYPTOCURRENCY',
      walletAddress: {
        not: null,
      },
    },
    select: {
      id: true,
      walletAddress: true,
    },
  });

  const progress = new Progress(ethereumAccounts.length);
  progress.start('Ethereum');

  for (const account of ethereumAccounts) {
    if (account.walletAddress) {
      try {
        const balance = await getBalance(account.walletAddress);

        logger.info(`Updating ${account.id} with balance ${balance}`);

        // const transactions = await getTransactionHistory(
        // 	account.walletAddress as string
        // )

        // const tokenAddresses = Object.values(tokens).map((token) => token.address)

        // for (let tokenAddress of tokenAddresses) {
        // 	const contract = new web3.eth.Contract(AbiIte, tokenAddress)
        // 	const tokenBalance = await contract.methods
        // 		.balanceOf(account.walletAddress)
        // 		.call()
        // 	logger.info(tokenBalance)
        // }

        // Update the account in the database with the new balance and transactions
        await prisma.asset.update({
          data: {
            balance,
            // transactions,
          },
          where: {
            id: account.id,
          },
        });

        progress.increment();
      } catch (error) {
        logger.error(error);
      }
    }
  }

  progress.stop('Ethereum');

  return new Date();
}
