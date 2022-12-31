import { Coin, createProtobufRpcClient, QueryClient } from "@cosmjs/stargate"
import { QueryClientImpl } from "cosmjs-types/cosmos/bank/v1beta1/query"
import { Tendermint34Client } from "@cosmjs/tendermint-rpc"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"
import { Progress } from "../../../util"
import { Decimal } from "database/generated/prisma-client/runtime"
import { logger } from "common"

const COSMOS_RPC = "https://cosmos-mainnet-rpc.allthatnode.com:26657"

const getBalance = async (
	denom: string,
	address: string,
	rcp: string
): Promise<Coin | undefined> => {
	try {
		const tendermint = await Tendermint34Client.connect(rcp)
		const queryClient = new QueryClient(tendermint)
		const rpcClient = createProtobufRpcClient(queryClient)
		const bankQueryService = new QueryClientImpl(rpcClient)

		const { balance } = await bankQueryService.Balance({
			address,
			denom,
		})

		return balance
	} catch (error) {
		console.log(error)
	}
}

const getCosmosBalance = (address: string) =>
	getBalance("uatom", address, COSMOS_RPC)

export async function updateCosmosBalances() {
	// Get all cryptocurrencies with type 'crypto', market ID 'eth', and a non-null wallet address
	const cryptocurrencies = await prisma.cryptocurrency.findMany({
		where: {
			market: {
				type: MarketType.CRYPTOCURRENCY,
			},
			marketId: "atom_CRYPTOCURRENCY",
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
	progress.start("Cosmos")

	// Iterate over the cryptocurrencies
	for (const cryptocurrency of cryptocurrencies) {
		const balance = await getCosmosBalance(
			cryptocurrency.walletAddress as string
		)

		const balanceInCosmos = new Decimal(String(balance?.amount)).times(10 ** -6)

		// Update the cryptocurrency in the database with the new balance and transactions
		await prisma.cryptocurrency.update({
			data: {
				balance: balanceInCosmos,
				// transactions,
			},

			where: {
				id: cryptocurrency.id,
			},
		})

		progress.increment()
	}

	progress.stop("Cosmos")

	return new Date()
}
