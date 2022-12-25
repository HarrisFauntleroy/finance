import { Progress } from "../../util"
import { logger } from "common"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"
import dotenv from "dotenv"
import Web3 from "web3"

dotenv.config()

const web3 = new Web3(
	new Web3.providers.HttpProvider(String(process.env.INFURA_API))
)

export async function getBalance(walletAddress: string): Promise<string> {
	const balance = await web3.eth.getBalance(walletAddress)

	return web3.utils.fromWei(balance, "ether")
}

export async function getTransactionHistory(
	walletAddress: string
): Promise<any[]> {
	const transactionCount = await web3.eth.getTransactionCount(walletAddress)

	const transactionHistory = []

	for (let i = 0; i < transactionCount; i++) {
		const receipt = await web3.eth.getTransactionReceipt(walletAddress)

		if (!receipt) continue

		const transaction = await web3.eth.getTransaction(receipt.transactionHash)

		transactionHistory.push({
			blockNumber: transaction.blockNumber,
			from: transaction.from,
			to: transaction.to,
			value: web3.utils.fromWei(transaction.value, "ether"),
			status: receipt.status,
		})
	}

	return transactionHistory
}

export async function updateEtherumBalances() {
	// Get all cryptocurrencies with type 'crypto', market ID 'eth', and a non-null wallet address
	const cryptocurrencies = await prisma.cryptocurrency.findMany({
		where: {
			market: {
				type: MarketType.CRYPTOCURRENCY,
			},
			marketId: "eth",
			walletAddress: {
				not: null,
			},
		},
		select: {
			id: true,
			walletAddress: true,
		},
	})

	const progress = new Progress(cryptocurrencies.length)
	progress.start()

	// Iterate over the cryptocurrencies
	for (const cryptocurrency of cryptocurrencies) {
		// Get the account balance and linked transactions
		// (I'm assuming here that you already have functions to do this)
		const balance = await getBalance(cryptocurrency.walletAddress as string)

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
		})

		progress.increment()
	}

	progress.stop()
}
