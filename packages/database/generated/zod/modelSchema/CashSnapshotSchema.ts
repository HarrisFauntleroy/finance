import { z } from 'zod';

/////////////////////////////////////////
// CASH SNAPSHOT SCHEMA
/////////////////////////////////////////

export const CashSnapshotSchema = z.object({
  id: z.string().cuid(),
  currency: z.string(),
  totalValue: z.string(),
  costBasis: z.string(),
  unrealisedGain: z.string(),
  realisedGain: z.string(),
  saleableValue: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
  deletedAt: z.coerce.date().nullable(),
})

export type CashSnapshot = z.infer<typeof CashSnapshotSchema>

export default CashSnapshotSchema;
