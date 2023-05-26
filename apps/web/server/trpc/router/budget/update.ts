import { prisma } from "@alchemical-finance/database";

import { createBudgetInput } from "./create";

import { z } from "zod";

export const updateBudgetInput = createBudgetInput.extend({
  id: z.string(),
});

export async function updateBudget(data: z.infer<typeof updateBudgetInput>) {
  return await prisma.budget.update({ where: { id: data.id }, data });
}
