import { getExchangeRates, getUserCurrency } from "../../util"
import { calculateAssetOverview, calculateManyAssets } from "common"
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
							user: {
								select: {
									settings: {
										select: {
											userCurrency: true,
										},
									},
								},
							},
						},
					},
					user: {
						select: {
							settings: {
								select: {
									userCurrency: true,
								},
							},
						},
					},
				},
			},
		},
	})

	const userCurrency = await getUserCurrency(userId)

	const exchangeRates = await getExchangeRates()

	if (!user) {
		throw new Error("Not found")
	}

	/** Calculate assets for overview */
	const assets = calculateManyAssets({
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
