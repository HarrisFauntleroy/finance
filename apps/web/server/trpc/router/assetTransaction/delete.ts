import { prisma } from "@alchemical-finance/database";

import { z } from "zod";

export const deleteAssetTransactionInput = z.object({
  id: z.string(),
});

export async function deleteAssetTransaction(id: string) {
  return await prisma.assetTransaction.delete({ where: { id } });
}
