import { publicProcedure, router } from "../../trpc"
import { TRPCError } from "@trpc/server"
import {
	calculateAssetOverview,
	calculateManyAsset,
	getExchangeRates,
} from "common"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"
import { z } from "zod"

/**
 * Routers: Asset
 * @Queries
 * asset.byId ✅
 * asset.byUserId ✅
 * @Mutations
 * asset.create ✅
 * asset.update ✅
 * asset.delete ✅
 */

export const assetRouter = router({
	all: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { id } = input
			const asset = await prisma.asset.findUnique({
				where: {
					id,
				},
				include: {
					market: true,
					subAssets: true,
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
			})
			if (!asset) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No asset with id '${id}'`,
				})
			}

			return asset
		}),
	byId: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { id } = input
			const asset = await prisma.asset.findUnique({
				where: {
					id,
				},
				include: {
					market: true,
					subAssets: true,
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
			})
			if (!asset) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No asset with id '${id}'`,
				})
			}

			return asset
		}),
	byUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { userId } = input

			const data = await prisma.asset.findMany({
				where: {
					userId,
					// This keeps sub accounts nested
					parentId: null,
				},
				include: {
					market: true,
					subAssets: {
						include: {
							// Needed for price data
							// Could lean this out
							market: true,
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
			})
			const { userCurrency } = await prisma.settings.findFirstOrThrow({
				where: {
					userId,
				},
			})

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

			// If no asset was found for the user, throw an error
			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No asset with userId '${userId}'`,
				})
			}
			// Calculate the asset values using the provided data, exchange rates, and user currency
			return calculateManyAsset({
				data: data,
				exchangeRates,
				userCurrency,
			})
		}),
	overviewByUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			// Destructure the userId from the input object
			const { userId } = input
			// Fetch the asset data for the user with the specified userId
			// Include the market data, children of the asset, and the user's settings
			const data = await prisma.asset.findMany({
				where: {
					userId,
					parentId: null,
				},
				include: {
					market: true,
					subAssets: true,
				},
			})
			// Fetch the user's settings
			const settings = await prisma.settings.findFirstOrThrow({
				where: {
					userId,
				},
			})
			// Get the user's preferred currency
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

			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No asset with userId '${userId}'`,
				})
			}

			/** Calculate asset for overview */
			const asset = calculateManyAsset({
				data,
				exchangeRates,
				userCurrency,
			})

			/** Overview should be its own router */
			const {
				totalValue,
				totalCostBasis,
				unrealisedGain,
				saleableValue,
				totalEstimatedYearlyReturn,
			} = calculateAssetOverview({ data: asset })

			return {
				totalValue: totalValue,
				saleableValue: saleableValue,
				totalCostBasis: totalCostBasis,
				unrealisedGain: unrealisedGain,
				totalEstimatedYearlyReturn: totalEstimatedYearlyReturn,
			}
		}),
	targets: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { userId } = input
			const data = await prisma.asset.findMany({
				where: {
					userId,
				},
				select: {
					balance: true,
					targetBalance: true,
					marketId: true,
					displayName: true,
				},
			})

			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No asset with userId '${userId}'`,
				})
			}
			return data
		}),
})
