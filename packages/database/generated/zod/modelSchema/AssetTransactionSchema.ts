import { z } from 'zod';

/////////////////////////////////////////
// ASSET TRANSACTION SCHEMA
/////////////////////////////////////////

export const AssetTransactionSchema = z.object({
  id: z.string().cuid(),
  timestamp: z.coerce.date().nullable(),
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
  expiry: z.coerce.date().nullable(),
  status: z.string().nullable(),
  transactionHash: z.string().nullable(),
  description: z.string().nullable(),
  memo: z.string().nullable(),
  relatedAssetId: z.string().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
  deletedAt: z.coerce.date().nullable(),
})

export type AssetTransaction = z.infer<typeof AssetTransactionSchema>

export default AssetTransactionSchema;
