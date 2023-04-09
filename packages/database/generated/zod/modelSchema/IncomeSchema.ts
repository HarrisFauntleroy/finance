import { z } from 'zod';

/////////////////////////////////////////
// INCOME SCHEMA
/////////////////////////////////////////

export const IncomeSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  payFrequency: z.string(),
  grossAmount: z.string(),
  grossFrequency: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
  deletedAt: z.coerce.date().nullable(),
})

export type Income = z.infer<typeof IncomeSchema>

export default IncomeSchema;
