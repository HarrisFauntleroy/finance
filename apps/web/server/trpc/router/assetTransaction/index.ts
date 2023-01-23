import { publicProcedure, router } from "../../trpc"
import { TRPCError } from "@trpc/server"
import { prisma } from "database"
import { z } from "zod"
import { date } from "~/utils/date"
import { decimal } from "~/utils/decimal"

/**
 * Routers: Asset
 * @Queries
 * assetTransaction.byId ✅
 * assetTransaction.byUserId ✅
 * @Mutations
 * assetTransaction.create ✅
 * assetTransaction.update ✅
 * assetTransaction.delete ✅
 */

const AssetTransactionZod = z.object({
	userId: z.string(),
	timestamp: date().nullable(),
	pricePerUnit: decimal().nullable(),
	baseCurrency: z.string(),
	quantity: decimal(),
	quantityFilled: decimal().nullable(),
	fee: decimal().nullable(),
	valueInBaseCurrency: decimal().nullable(),
	fromAsset: z.string().nullable(),
	toAsset: z.string(),
	market: z.string().nullable(),
	transactionType: z.string(),
	expiry: date().nullable(),
	status: z.string().nullable(),
	transactionHash: z.string().nullable(),
	description: z.string().nullable(),
	memo: z.string().nullable(),
	relatedAssetId: z.string().nullable(),
})

const AssetTransactionWithIdZod = AssetTransactionZod.extend({ id: z.string() })

export const assetTransactionRouter = router({
	create: publicProcedure
		.input(AssetTransactionZod)
		.mutation(async ({ input }) => {
			return prisma.assetTransaction.create({
				data: input,
			})
		}),
	createChild: publicProcedure
		.input(AssetTransactionZod.extend({ parentId: z.string() }))
		.mutation(async ({ input: data }) => {
			return prisma.assetTransaction.create({
				data,
			})
		}),
	update: publicProcedure
		.input(AssetTransactionWithIdZod)
		.mutation(async ({ input }) => {
			const { id, ...data } = input
			return prisma.assetTransaction.update({
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
			await prisma.assetTransaction.delete({
				where: { id },
			})
			return {
				id,
			}
		}),
	all: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { id } = input
			const assetTransaction = await prisma.assetTransaction.findUnique({
				where: {
					id,
				},
			})
			if (!assetTransaction) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No assetTransaction with id '${id}'`,
				})
			}

			return assetTransaction
		}),
	byId: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { id } = input
			const assetTransaction = await prisma.assetTransaction.findUnique({
				where: {
					id,
				},
			})
			if (!assetTransaction) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No assetTransaction with id '${id}'`,
				})
			}

			return assetTransaction
		}),
	// byUserId: publicProcedure
	// 	.input(
	// 		z.object({
	// 			userId: z.string(),
	// 		})
	// 	)
	// 	.query(async ({ input }) => {
	// 		const { userId } = input

	// 		const data = await prisma.assetTransaction.findMany({
	// 			where: {
	// 				userId,
	// 				// This keeps sub accounts nested
	// 				parentId: null,
	// 			},
	// 			include: {
	// 				market: true,
	// 				subAssets: {
	// 					include: {
	// 						market: true,
	// 					},
	// 				},
	// 				user: {
	// 					select: {
	// 						settings: {
	// 							select: {
	// 								userCurrency: true,
	// 							},
	// 						},
	// 					},
	// 				},
	// 			},
	// 		})
	// 		const { userCurrency } = await prisma.settings.findFirstOrThrow({
	// 			where: {
	// 				userId,
	// 			},
	// 		})

	// 		// Fetch the market rates
	// 		const markets = await prisma.market.findMany({
	// 			where: {
	// 				type: MarketType.CASH,
	// 			},
	// 			select: {
	// 				currency: true,
	// 				price: true,
	// 				name: true,
	// 				ticker: true,
	// 			},
	// 		})

	// 		/** Convert array to object */
	// 		const exchangeRates = getExchangeRates(markets)

	// 		// If no assetTransaction was found for the user, throw an error
	// 		if (!data) {
	// 			throw new TRPCError({
	// 				code: "NOT_FOUND",
	// 				message: `No assetTransaction with userId '${userId}'`,
	// 			})
	// 		}
	// 		// Calculate the assetTransaction values using the provided data, exchange rates, and user currency
	// 		return calculateManyCrypto({
	// 			data: data,
	// 			exchangeRates,
	// 			userCurrency,
	// 		})
	// 	}),
	byUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { userId } = input
			const budgetResponse = await prisma.assetTransaction.findMany({
				where: {
					userId,
				},
				orderBy: {
					createdAt: "asc",
				},
			})
			if (!budgetResponse) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No budget with userId '${userId}'`,
				})
			}
			return budgetResponse
		}),
})
