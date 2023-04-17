import { z } from 'zod';

export const BudgetEnvelopeScalarFieldEnumSchema = z.enum(['id','budgetId','name','remainingAmount','totalAmount','createdAt','updatedAt','deleted','deletedAt']);

export default BudgetEnvelopeScalarFieldEnumSchema;
