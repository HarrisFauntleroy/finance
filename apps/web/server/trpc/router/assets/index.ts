import { publicProcedure, router } from "../../trpc"
import { byId, byUserId } from "../schema"
import { createAsset, createAssetInput } from "./create"
import { deleteAsset } from "./delete"
import { updateAsset, updateAssetInput } from "./update"
import { TRPCError } from "@trpc/server"
import {
	calculateAssetOverview,
	calculateManyAssets,
	convertCurrency,
	logger,
	multiply,
	sumGroupByCategory,
} from "common"
import { prisma } from "database"
import { z } from "zod"
import { Category } from "~/../../packages/database/generated/prisma-client"
import { getExchangeRates, getUserCurrency } from "~/server/api"

/** TODO: Remove this shit */
async function getAssetsWithMarket(userId: string) {
	return await prisma.asset.findMany({
		where: { userId, category: { not: null } },
		include: { market: true },
	})
}

type PortfolioAllocation = {
	name: string
	balance: string
	currency: string
	category: Category | null
	market: {
		currency: string
		price: string | null
	} | null
}

export async function getPortfolioAllocation(
	userId: string
): Promise<PortfolioAllocation[]> {
	const assets = await getAssetsWithMarket(userId)
	const userCurrency = await getUserCurrency(userId)
	const exchangeRates = await getExchangeRates()
	const mapped = assets.map(({ market, balance, category, currency }) => {
		const price = convertCurrency({
			exchangeRates,
			fromCurrency: market?.currency || currency,
			toCurrency: userCurrency,
			amount: market?.price?.toString() || 0,
		})
		let value
		if (price && category === Category.CRYPTOCURRENCY) {
			value = multiply(balance.toString(), price.toString())
		} else {
			value = balance
		}
		return { value: value.toString(), category }
	})

	return sumGroupByCategory(mapped, "category")
}

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

	createChild: publicProcedure
		.input(createAssetInput.extend({ parentId: z.string() }))
		.mutation(async ({ input }) => {
			return await createAsset(input)
		}),

	byId: publicProcedure.input(byId).query(async ({ input }) => {
		const { id } = input
		return await prisma.asset
			.findUnique({
				where: {
					id,
				},
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
			})
			.catch(() => {
				throw new TRPCError({
					code: "NOT_FOUND",
				})
			})
	}),
	byUserId: publicProcedure.input(byUserId).query(async ({ input }) => {
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
		})

		const userCurrency = await getUserCurrency(userId)
		const exchangeRates = await getExchangeRates()

		return calculateManyAssets({
			data,
			exchangeRates,
			userCurrency,
		})
	}),
	overviewAccountsListbyUserId: publicProcedure
		.input(byUserId)
		.query(async ({ input }) => {
			const { userId } = input

			const data = await prisma.asset
				.findMany({
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
				})
				.catch(() => {
					throw new TRPCError({
						code: "NOT_FOUND",
					})
				})

			const userCurrency = await getUserCurrency(userId)
			const exchangeRates = await getExchangeRates()

			return calculateManyAssets({
				data,
				exchangeRates,
				userCurrency,
			})
		}),

	overviewByUserId: publicProcedure
		.input(byUserId)
		.query(async ({ input: { userId } }) =>
			getUserCurrency(userId)
				.then((userCurrency) =>
					prisma.asset
						.findMany({
							where: {
								userId,
								parentId: null,
							},
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
						})
						.then((data) =>
							getExchangeRates().then((exchangeRates) => {
								const calculatedAssets = calculateManyAssets({
									data,
									exchangeRates,
									userCurrency,
								})
								return calculateAssetOverview(calculatedAssets)
							})
						)
						.catch(() => {
							throw new TRPCError({
								code: "NOT_FOUND",
							})
						})
				)
				.catch(logger.error)
		),

	targets: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input: { userId } }) => {
			return await prisma.asset
				.findMany({
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
				.catch(() => {
					throw new TRPCError({
						code: "NOT_FOUND",
					})
				})
		}),

	byUserIdOld: publicProcedure
		.input(byUserId)
		.query(async ({ input: { userId } }) => {
			const data = await prisma.user.findUnique({
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
					portfolioSnapshot: true,
				},
			})

			if (!data) {
				throw new TRPCError({
					code: "NOT_FOUND",
				})
			}

			const userCurrency = await getUserCurrency(userId)
			const exchangeRates = await getExchangeRates()

			const assets = calculateManyAssets({
				data: data?.assets,
				exchangeRates,
				userCurrency,
			})

			const { totalValue, totalCostBasis, unrealisedGain, saleableValue } =
				calculateAssetOverview(assets)

			return {
				totalValue,
				saleableValue,
				totalCostBasis,
				unrealisedGain,
				assets,
				portfolioSnapshot: data?.portfolioSnapshot,
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
