import { z } from 'zod';

/////////////////////////////////////////
// SECURITY SNAPSHOT SCHEMA
/////////////////////////////////////////

export const SecuritySnapshotSchema = z.object({
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

export type SecuritySnapshot = z.infer<typeof SecuritySnapshotSchema>

export default SecuritySnapshotSchema;