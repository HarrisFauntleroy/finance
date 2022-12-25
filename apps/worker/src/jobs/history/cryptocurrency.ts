import { TRPCError } from "@trpc/server"
import {
	calculateCryptoOverview,
	calculateManyCrypto,
	getExchangeRates,
} from "common"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"

export const calculateCryptoTotals = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			id: true,
			cryptocurrency: {
				include: {
					market: true,
					Children: true,
				},
			},
		},
	})
	const settings = await prisma.settings.findFirstOrThrow({
		where: {
			userId,
		},
	})
	const userCurrency = settings.userCurrency

	// Fetch the market rates
	const markets = await prisma.market.findMany({
		where: {
			type: MarketType.CASH,
		},
		select: {
			currency: true,
			price: true,
			name: true,
			ticker: true,
		},
	})

	/** Convert array to object */
	const exchangeRates = getExchangeRates(markets)

	if (!user) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: `No user with userId '${userId}'`,
		})
	}

	/** Calculate cryptocurrency for overview */
	const cryptocurrency = calculateManyCrypto({
		data: user?.cryptocurrency,
		exchangeRates,
		userCurrency,
	})

	const { totalValue, totalCostBasis, unrealisedGain, saleableValue } =
		calculateCryptoOverview({ data: cryptocurrency })

	return {
		currency: userCurrency,
		totalValue: totalValue.toString(),
		costBasis: totalCostBasis.toString(),
		unrealisedGain: unrealisedGain.toString(),
		realisedGain: "0",
		saleableValue: saleableValue.toString(),
	}
}
