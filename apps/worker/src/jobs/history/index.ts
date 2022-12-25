import { Progress } from "../../util"
import { calculateCryptoTotals } from "./cryptocurrency"
import { prisma } from "database"
import { Decimal } from "database/generated/prisma-client/runtime"
import ProgressBar from "progress"

export const history = async () => {
	/** Get userId of signed in user */
	const users: { id: string }[] = await prisma.user.findMany({
		select: {
			id: true,
		},
	})

	const progress = new Progress(users.length)

	progress.start()

	const results: { user?: string; status: string }[] = []

	// Cryptocurrency portfolioSnapshot
	await Promise.all(
		users.map(async ({ id: userId }) => {
			try {
				/** Calculate overview totals to store for history */
				const totals = await calculateCryptoTotals(userId)
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
				progress.increment()
				/** Return PortfolioSnapshot object */
				results.push({ user: response.userId, status: "Succeeded" })
			} catch (error) {
				progress.increment()
				/** Return the thrown error */
				results.push({ status: "Failed" })
			}
		})
	)

	return `Snapshot: ${new Date()}`
}
