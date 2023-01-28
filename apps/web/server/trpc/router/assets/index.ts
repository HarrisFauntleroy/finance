import { publicProcedure, router } from "../../trpc"
import { AssetWithIdZod, AssetWithParentId, AssetZod } from "./zod"
import { TRPCError } from "@trpc/server"
import { calculateAssetOverview, calculateManyAsset } from "common"
import { prisma } from "database"
import { z } from "zod"
import { getExchangeRates, getUserCurrency } from "~/server/api"

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
	create: publicProcedure.input(AssetZod).mutation(async ({ input: data }) => {
		return prisma.asset.create({ data })
	}),
	createChild: publicProcedure
		.input(AssetWithParentId)
		.mutation(async ({ input }) => {
			return prisma.asset.create({
				data: input,
				include: {
					market: true,
					subAssets: {
						include: {
							market: true,
						},
					},
					transactions: true,
				},
			})
		}),
	update: publicProcedure.input(AssetWithIdZod).mutation(async ({ input }) => {
		const { id, ...data } = input
		return prisma.asset.update({
			where: { id },
			data,
			include: {
				user: true,
			},
		})
	}),
	delete: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			const { id } = input
			await prisma.asset.delete({
				where: { id },
			})
			return {
				id,
			}
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

			const userCurrency = await getUserCurrency(userId)

			const exchangeRates = await getExchangeRates()

			// If no asset was found for the user, throw an error
			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No asset with userId '${userId}'`,
				})
			}
			// Calculate the asset values using the provided data, exchange rates, and user currency
			return calculateManyAsset({
				data,
				exchangeRates,
				userCurrency,
			})
		}),
	overviewAccountsListbyUserId: publicProcedure
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

			/** Convert array to object */
			const exchangeRates = await getExchangeRates()

			// If no asset was found for the user, throw an error
			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No asset with userId '${userId}'`,
				})
			}
			// Calculate the asset values using the provided data, exchange rates, and user currency
			return calculateManyAsset({
				data,
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
		.query(async ({ input: { userId } }) => {
			const userCurrency = await getUserCurrency(userId)
			const exchangeRates = await getExchangeRates()
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

			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No asset with userId '${userId}'`,
				})
			}

			const asset = calculateManyAsset({
				data,
				exchangeRates,
				userCurrency,
			})

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
					name: true,
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
