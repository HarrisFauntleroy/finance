import { publicProcedure, router } from "../../trpc"
import { byId, byUserId } from "../schema"
import { createAsset, createAssetInput } from "./create"
import { deleteAsset } from "./delete"
import { updateAsset, updateAssetInput } from "./update"
import { TRPCError } from "@trpc/server"
import { calculateAssetOverview, calculateManyAsset, logger } from "common"
import { prisma } from "database"
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
				transactions: true,
				subAssets: {
					include: {
						market: true,
						transactions: true,
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

		return calculateManyAsset({
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

			return calculateManyAsset({
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
								subAssets: true,
							},
						})
						.then((data) =>
							getExchangeRates().then((exchangeRates) => {
								const calculatedAssets = calculateManyAsset({
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
})
