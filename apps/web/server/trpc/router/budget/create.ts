import { prisma } from "@alchemical-finance/database";

import { z } from "zod";

export const createBudgetInput = z.object({
  name: z.string(),
  userId: z.string(),
  totalBalance: z.string(),
});

export async function createBudget(data: z.infer<typeof createBudgetInput>) {
  return await prisma.budget.create({ data });
}
