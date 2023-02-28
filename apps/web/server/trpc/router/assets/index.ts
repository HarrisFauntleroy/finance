import { publicProcedure, router } from "../../trpc"
import { byId, byUserId } from "../schema"
import { createAsset, createAssetInput } from "./create"
import { deleteAsset } from "./delete"
import { getAssetById } from "./getAssetById"
import { getAssetsByUserId } from "./getAssetsByUserId"
import { getPortfolioAllocation } from "./getPortfolioAllocation"
import { updateAsset, updateAssetInput } from "./update"
import { TRPCError } from "@trpc/server"
import { calculateAssetValue, calculateAssetValueOverview } from "common"
import { prisma } from "database"
import { Prisma } from "database/generated/prisma-client"
import { z } from "zod"
import { getExchangeRates, getUserCurrency } from "~/server/api"

export const assetRouter = router({
	create: publicProcedure
		.input(createAssetInput)
		.mutation(async ({ input }) => {
			return await createAsset(input)
		}),

	update: publicProcedure
		.input(updateAssetInput)
		.mutation(async ({ input }) => {
			return await updateAsset(input)
		}),

	delete: publicProcedure.input(byId).mutation(async ({ input: { id } }) => {
		return await deleteAsset(id)
	}),

	// Needed still?
	createChild: publicProcedure
		.input(createAssetInput.extend({ parentId: z.string() }))
		.mutation(async ({ input }) => {
			return await createAsset(input)
		}),

	byId: publicProcedure.input(byId).query(async ({ input: { id } }) => {
		return getAssetById(id)
	}),

	byUserId: publicProcedure
		.input(byUserId)
		.query(async ({ input: { userId } }) => {
			const userCurrency = await getUserCurrency(userId)
			const exchangeRates = await getExchangeRates()
			const assets = await getAssetsByUserId(userId)

			return assets.map((asset) =>
				calculateAssetValue(asset, exchangeRates, userCurrency)
			)
		}),

	overviewAccountsListbyUserId: publicProcedure
		.input(byUserId)
		.query(async ({ input: { userId } }) => {
			const userCurrency = await getUserCurrency(userId)
			const exchangeRates = await getExchangeRates()
			const assets: Prisma.PromiseReturnType<typeof getAssetsByUserId> =
				await getAssetsByUserId(userId)

			return assets.map((asset) =>
				calculateAssetValue(asset, exchangeRates, userCurrency)
			)
		}),

	overviewByUserId: publicProcedure
		.input(byUserId)
		.query(async ({ input: { userId } }) => {
			const userCurrency = await getUserCurrency(userId)
			const exchangeRates = await getExchangeRates()
			const assets = await getAssetsByUserId(userId)

			// Why this intermediary step?
			// I think this is the stage at which we add computed properties
			const calculatedAssets = assets.map((asset) =>
				calculateAssetValue(asset, exchangeRates, userCurrency)
			)

			// Distinction needed? up and down

			// Then we calculate overview values, which are?
			return calculateAssetValueOverview(calculatedAssets)
		}),

	targets: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input: { userId } }) => {
			const assets = await getAssetsByUserId(userId, {
				select: {
					balance: true,
					targetBalance: true,
					marketId: true,
					name: true,
				},
			})

			return assets
		}),

	byUserIdOld: publicProcedure
		.input(byUserId)
		.query(async ({ input: { userId } }) => {
			const { portfolioSnapshot, assets } = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					id: true,
					assets: {
						include: {
							market: true,
							transactions: true,
							subAssets: {
								include: {
									market: true,
									transactions: true,
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
					portfolioSnapshot: true,
				},
			})

			if (!assets) {
				throw new TRPCError({
					code: "NOT_FOUND",
				})
			}

			const userCurrency = await getUserCurrency(userId)
			const exchangeRates = await getExchangeRates()

			const calculatedAssets = assets.map((asset) =>
				calculateAssetValue(asset, exchangeRates, userCurrency)
			)

			const { totalValue, totalCostBasis, unrealisedGain, saleableValue } =
				calculateAssetValueOverview(calculatedAssets)

			return {
				totalValue,
				saleableValue,
				totalCostBasis,
				unrealisedGain,
				assets,
				portfolioSnapshot,
			}
		}),

	allocation: publicProcedure
		.input(byUserId)
		.query(async ({ input: { userId } }) => {
			return getPortfolioAllocation(userId)
		}),

	historyByUserId: publicProcedure
		.input(byUserId)
		.query(async ({ input: { userId } }) => {
			// TODO would be nice if current total value and cost basis were in this as most recent data point
			const data = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					id: true,
					portfolioSnapshot: true,
				},
			})

			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
				})
			}

			return data
		}),
})
