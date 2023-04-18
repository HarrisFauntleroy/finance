import { z } from 'zod';

/////////////////////////////////////////
// BUDGET ENVELOPE SCHEMA
/////////////////////////////////////////

export const BudgetEnvelopeSchema = z.object({
  id: z.string().cuid(),
  budgetId: z.string(),
  name: z.string(),
  remainingAmount: z.string(),
  totalAmount: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
  deletedAt: z.coerce.date().nullable(),
});

export type BudgetEnvelope = z.infer<typeof BudgetEnvelopeSchema>;

export default BudgetEnvelopeSchema;
