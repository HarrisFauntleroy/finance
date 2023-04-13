import { z } from 'zod';

/////////////////////////////////////////
// BUDGET SCHEMA
/////////////////////////////////////////

export const BudgetSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  userId: z.string(),
  totalBalance: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
  deletedAt: z.coerce.date().nullable(),
});

export type Budget = z.infer<typeof BudgetSchema>;

export default BudgetSchema;
