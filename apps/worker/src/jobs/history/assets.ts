import { getExchangeRates, getUserCurrency } from "../../util"
import { TRPCError } from "@trpc/server"
import { calculateAssetOverview, calculateManyAsset } from "common"
import { prisma } from "database"

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

	/** Calculate assets for overview */
	const assets = calculateManyAsset({
		data: user.assets,
		exchangeRates,
		userCurrency,
	})

	const { totalValue, totalCostBasis, unrealisedGain, saleableValue } =
		calculateAssetOverview(assets)

	return {
		currency: userCurrency,
		totalValue: totalValue,
		costBasis: totalCostBasis,
		unrealisedGain: unrealisedGain,
		realisedGain: "0",
		saleableValue: saleableValue,
	}
}
