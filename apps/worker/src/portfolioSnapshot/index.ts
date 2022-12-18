import { TRPCError } from "@trpc/server"
import {
	calculateCryptoOverview,
	calculateManyCrypto,
	getExchangeRates,
} from "common"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"
import { Decimal } from "database/generated/prisma-client/runtime"

export const calculateUserTotals = async (userId: string) => {
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

/**
 * @swagger
 * /api/portfolioSnapshot:
 *   get:
 *     description: Creates new portfolioSnapshot entry
 *     responses:
 *       200:
 *         description: all transactions related to an account
 */
const portfolioSnapshot = async () => {
	/** Get userId of signed in user */
	const users: { id: string }[] = await prisma.user.findMany({
		select: {
			id: true,
		},
	})

	const results: { user?: string; status: string }[] = []

	await Promise.all(
		users.map(async ({ id: userId }) => {
			try {
				/** Calculate overview totals to store for history */
				const totals = await calculateUserTotals(userId)
				/** Create new portfolioSnapshot entry */
				const response = await prisma.portfolioSnapshot.create({
					data: {
						userId,
						currency: totals.currency,
						costBasis: new Decimal(totals.costBasis),
						totalValue: new Decimal(totals.totalValue),
						realisedGain: new Decimal(totals.realisedGain),
						saleableValue: new Decimal(totals.saleableValue),
						unrealisedGain: new Decimal(totals.unrealisedGain),
					},
					select: {
						id: true,
						userId: true,
						totalValue: true,
						costBasis: true,
						unrealisedGain: true,
						realisedGain: true,
						saleableValue: true,
						createdAt: true,
					},
				})
				/** Return PortfolioSnapshot object */
				results.push({ user: response.userId, status: "Succeeded" })
			} catch (error) {
				/** Return the thrown error */
				results.push({ status: "Failed" })
			}
		})
	)
	return `Snapshots: ${new Date()}`
}

export default portfolioSnapshot
