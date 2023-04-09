import { z } from 'zod';

/////////////////////////////////////////
// BUDGET TRANSACTION SCHEMA
/////////////////////////////////////////

export const BudgetTransactionSchema = z.object({
  id: z.string().cuid(),
  timestamp: z.coerce.date(),
  pricePerUnit: z.string(),
  baseCurrency: z.string(),
  quantity: z.string(),
  quantityFilled: z.string().nullable(),
  fee: z.string(),
  valueInBaseCurrency: z.string(),
  fromAsset: z.string().nullable(),
  toAsset: z.string(),
  market: z.string(),
  transactionType: z.string(),
  expiry: z.coerce.date().nullable(),
  status: z.string(),
  transactionHash: z.string(),
  description: z.string(),
  memo: z.string(),
  imageUrl: z.string().nullable(),
  imageName: z.string().nullable(),
  imageId: z.string().nullable(),
  budgetEnvelopeId: z.string().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
  deletedAt: z.coerce.date().nullable(),
});

export type BudgetTransaction = z.infer<typeof BudgetTransactionSchema>;

export default BudgetTransactionSchema;
