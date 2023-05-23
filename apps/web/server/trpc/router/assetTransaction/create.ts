import { prisma } from "database";

import { date, z } from "zod";

export const createAssetTransactionInput = z.object({
  userId: z.string(),
  timestamp: date().nullable(),
  pricePerUnit: z.string().nullable(),
  baseCurrency: z.string(),
  quantity: z.string(),
  quantityFilled: z.string().nullable(),
  fee: z.string().nullable(),
  valueInBaseCurrency: z.string().nullable(),
  fromAsset: z.string().nullable(),
  toAsset: z.string(),
  market: z.string().nullable(),
  transactionType: z.string(),
  expiry: date().nullable(),
  status: z.string().nullable(),
  transactionHash: z.string().nullable(),
  description: z.string().nullable(),
  memo: z.string().nullable(),
  relatedAssetId: z.string().nullable(),
});

export async function createAssetTransaction(
  data: z.infer<typeof createAssetTransactionInput>
) {
  return await prisma.assetTransaction.create({ data });
}
