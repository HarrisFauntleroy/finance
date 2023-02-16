import { Progress } from "../../../util"
import { Coin, QueryClient, createProtobufRpcClient } from "@cosmjs/stargate"
import { Tendermint34Client } from "@cosmjs/tendermint-rpc"
import { logger } from "common"
import { QueryClientImpl } from "cosmjs-types/cosmos/bank/v1beta1/query"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"
import { Decimal } from "database/generated/prisma-client/runtime/library"

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

const getAtomBalance = (address: string) =>
	getBalance("uatom", address, COSMOS_RPC)

export async function updateAtomBalances() {
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
	progress.start("Atom")

	for (const cryptocurrency of cryptocurrencies) {
		if (cryptocurrency.walletAddress)
			try {
				const balance = await getAtomBalance(
					cryptocurrency.walletAddress
				).catch(logger.error)

				const balanceInCosmos = new Decimal(String(balance?.amount)).times(
					10 ** -6
				)

				await prisma.cryptocurrency.update({
					data: {
						balance: balanceInCosmos.toString(),
						// transactions,
					},

					where: {
						id: cryptocurrency.id,
					},
				})

				progress.increment()
			} catch (error) {
				logger.error(error)
			}
	}

	progress.stop("Atom")

	return new Date()
}
