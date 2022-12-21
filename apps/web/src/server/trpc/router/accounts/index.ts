import { publicProcedure, router } from "../../trpc"
import { TRPCError } from "@trpc/server"
import {
	calculateCryptoOverview,
	calculateManyCrypto,
	getExchangeRates,
} from "common"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"
import { z } from "zod"
import currency from "currency.js"

export async function getPortfolioAllocation(
	userId: string
): Promise<{ name: MarketType; value: number }[]> {
	const cryptoSnapshots = await prisma.portfolioSnapshot.findMany({
		where: { userId },
		select: { totalValue: true },
	})
	const cashSnapshots = await prisma.cashSnapshot.findMany({
		where: { userId },
		select: { totalValue: true },
	})
	const propertySnapshots = await prisma.propertySnapshot.findMany({
		where: { userId },
		select: { totalValue: true },
	})
	const securitySnapshots = await prisma.securitySnapshot.findMany({
		where: { userId },
		select: { totalValue: true },
	})

	const sumTotalValue = (data: Record<string, unknown>[]) =>
		data
			.map(({ totalValue }) => currency(String(totalValue)))
			.reduce((sum, totalValue) => sum.add(totalValue), currency(0))

	const totalCryptoValue = sumTotalValue(cryptoSnapshots)
	const totalCashValue = sumTotalValue(cashSnapshots)
	const totalPropertyValue = sumTotalValue(propertySnapshots)
	const totalSecurityValue = sumTotalValue(securitySnapshots)

	// Calculate the percentage of the total portfolio value that each asset class represents
	const totalPortfolioValue = totalCryptoValue
		.add(totalCashValue)
		.add(totalPropertyValue)
		.add(totalSecurityValue)
	const cryptoPercentage = totalCryptoValue
		.divide(totalPortfolioValue)
		.multiply(100)
	const cashPercentage = totalCashValue
		.divide(totalPortfolioValue)
		.multiply(100)
	const propertyPercentage = totalPropertyValue
		.divide(totalPortfolioValue)
		.multiply(100)
	const securityPercentage = totalSecurityValue
		.divide(totalPortfolioValue)
		.multiply(100)

	// Return the data in the format required by a pie chart
	return [
		{ name: MarketType.CRYPTOCURRENCY, value: cryptoPercentage.value },
		{ name: MarketType.CASH, value: cashPercentage.value },
		{ name: MarketType.OTHER, value: propertyPercentage.value },
		{ name: MarketType.STOCK, value: securityPercentage.value },
	]
}

/**
 * Routers: Accounts
 * @Queries
 * accounts.byUserId ✅
 * accounts.historyByUserId ✅
 */

export const accountsRouter = router({
	byUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			// Destructure the userId from the input object
			const { userId } = input
			// Fetch the user data using the userId provided
			// Select the user's id, cryptocurrency, and portfolioSnapshot
			const userResponse = await prisma.user.findUnique({
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
					portfolioSnapshot: true,
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

			// If the user was not found, throw an error
			if (!userResponse) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No user with userId '${userId}'`,
				})
			}

			/** Calculate cryptocurrency for overview */
			const cryptocurrency = calculateManyCrypto({
				data: userResponse.cryptocurrency,
				exchangeRates,
				userCurrency,
			})

			// Calculate the total value, saleable value, total cost basis, and unrealised gain for the cryptocurrency
			const { totalValue, totalCostBasis, unrealisedGain, saleableValue } =
				calculateCryptoOverview({ data: cryptocurrency })

			// Return the calculated values and the user's cryptocurrency and accounts history
			return {
				totalValue,
				saleableValue,
				totalCostBasis,
				unrealisedGain,
				cryptocurrency,
				portfolioSnapshot: userResponse.portfolioSnapshot,
			}
		}),
	allocation: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			// Destructure the userId from the input object
			const { userId } = input

			return getPortfolioAllocation(userId)
		}),
	historyByUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { userId } = input
			const portfolioSnapshot = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					id: true,
					portfolioSnapshot: true,
				},
			})
			if (!portfolioSnapshot) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No portfolioSnapshot with userId '${userId}'`,
				})
			}
			return portfolioSnapshot
		}),
})
