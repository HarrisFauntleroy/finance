import { logger } from "common"
import { prisma } from "database"
import { subDays } from "date-fns"

const deleter = async () => {
	const sevenDaysAgo = subDays(new Date(), 7)

	// Delete users
	await prisma.user.deleteMany({
		where: {
			deleted: true,
			deletedAt: {
				lte: sevenDaysAgo,
			},
		},
	})

	// Delete settings
	await prisma.settings.deleteMany({
		where: {
			deleted: true,
			deletedAt: {
				lte: sevenDaysAgo,
			},
		},
	})

	// Delete budgets
	await prisma.budget.deleteMany({
		where: {
			deleted: true,
			deletedAt: {
				lte: sevenDaysAgo,
			},
		},
	})

	// Delete cryptocurrency
	await prisma.cryptocurrency.deleteMany({
		where: {
			deleted: true,
			deletedAt: {
				lte: sevenDaysAgo,
			},
		},
	})

	return `Delete queue: ${new Date()}`
}

export default deleter
