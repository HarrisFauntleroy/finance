import { prisma } from "database"
import { z } from "zod"
import { decimal } from "~/utils/decimal"

export const createBudgetInput = z.object({
	name: z.string(),
	userId: z.string(),
	totalBalance: decimal(),
})

export async function createBudget(data: z.infer<typeof createBudgetInput>) {
	return await prisma.budget.create({ data })
}
