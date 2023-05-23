import { prisma } from "database";

import { z } from "zod";

export const deleteBudgetTransactionInput = z.object({
  id: z.string(),
});

export async function deleteBudgetTransaction(id: string) {
  return await prisma.budgetTransaction.delete({ where: { id } });
}
