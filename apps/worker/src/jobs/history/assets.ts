import { getExchangeRates, getUserCurrency } from "../../util"
import { TRPCError } from "@trpc/server"
import { calculateAssetOverview, calculateManyAsset } from "common"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"

export const calculateAssetsTotals = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			id: true,
			assets: {
				include: {
					market: true,
					subAssets: {
						include: {
							market: true,
						},
					},
				},
			},
		},
	})

	const userCurrency = await getUserCurrency(userId)

	const exchangeRates = await getExchangeRates()

	if (!user) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: `No user with userId '${userId}'`,
		})
	}

	/** Calculate cryptocurrency for overview */
	const cryptocurrency = calculateManyAsset({
		data: user.assets,
		exchangeRates,
		userCurrency,
	})

	const { totalValue, totalCostBasis, unrealisedGain, saleableValue } =
		calculateAssetOverview({ data: cryptocurrency })

	return {
		currency: userCurrency,
		totalValue: totalValue.toString(),
		costBasis: totalCostBasis.toString(),
		unrealisedGain: unrealisedGain.toString(),
		realisedGain: "0",
		saleableValue: saleableValue.toString(),
	}
}
