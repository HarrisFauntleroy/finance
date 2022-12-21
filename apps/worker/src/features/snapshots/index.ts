import { prisma } from "database"
import { Decimal } from "database/generated/prisma-client/runtime"
import ProgressBar from "progress"
import { calculateCryptoTotals } from "./cryptocurrency"

const portfolioSnapshot = async () => {
	/** Get userId of signed in user */
	const users: { id: string }[] = await prisma.user.findMany({
		select: {
			id: true,
		},
	})

	const progressbar = new ProgressBar("-> Processing [:bar] :percent :etas", {
		total: users.length,
		width: 30,
	})

	const results: { user?: string; status: string }[] = []

	// Cryptocurrency snapshots
	await Promise.all(
		users.map(async ({ id: userId }) => {
			try {
				/** Calculate overview totals to store for history */
				const totals = await calculateCryptoTotals(userId)
				/** Create new portfolioSnapshot entry */
				const response = await prisma.cryptoSnapshot.create({
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
				progressbar.tick(1)
				/** Return PortfolioSnapshot object */
				results.push({ user: response.userId, status: "Succeeded" })
			} catch (error) {
				progressbar.tick(1)
				/** Return the thrown error */
				results.push({ status: "Failed" })
			}
		})
	)

	return `Snapshot: ${new Date()}`
}

export default portfolioSnapshot
