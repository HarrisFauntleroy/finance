import { createBudgetTransactionInput } from "./create"
import { prisma } from "database"
import { z } from "zod"

export const updatBudgetransactionInput = createBudgetTransactionInput.extend({
	id: z.string(),
})

export async function updatBudgetransaction(
	data: z.infer<typeof updatBudgetransactionInput>
) {
	return await prisma.budgetTransaction.update({
		where: { id: data.id },
		data,
	})
}
