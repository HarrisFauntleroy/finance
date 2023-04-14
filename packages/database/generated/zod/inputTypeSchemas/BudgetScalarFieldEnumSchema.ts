import { z } from 'zod';

export const BudgetScalarFieldEnumSchema = z.enum(['id','name','userId','totalBalance','createdAt','updatedAt','deleted','deletedAt']);

export default BudgetScalarFieldEnumSchema;
