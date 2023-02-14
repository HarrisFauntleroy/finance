import { Progress } from "../../util"
import { calculateAssetsTotals } from "./assets"
import { prisma } from "database"

export const history = async () => {
	/** Get userId of signed in user */
	const users: { id: string }[] = await prisma.user.findMany({
		select: {
			id: true,
		},
	})

	const progress = new Progress(users.length)

	progress.start("History")

	const results: { user?: string; status: string }[] = []

	// Assets portfolioSnapshot
	await Promise.all(
		users.map(async ({ id: userId }) => {
			try {
				/** Calculate overview totals to store for history */
				const totals = await calculateAssetsTotals(userId)
				/** Create new portfolioSnapshot entry */
				const response = await prisma.portfolioSnapshot.create({
					data: {
						userId,
						currency: totals.currency,
						costBasis: totals.costBasis,
						totalValue: totals.totalValue,
						realisedGain: totals.realisedGain,
						saleableValue: totals.saleableValue,
						unrealisedGain: totals.unrealisedGain,
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

	progress.stop("History")

	return new Date()
}
