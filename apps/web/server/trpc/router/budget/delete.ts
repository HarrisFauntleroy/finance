import { prisma } from 'database';

import { z } from 'zod';

export const deleteBudgetInput = z.object({
  id: z.string(),
});

export async function deleteBudget(id: string) {
  return await prisma.budget.delete({ where: { id } });
}
