import { z } from 'zod';

export const CategorySchema = z.enum([
  'LOAN',
  'CASH',
  'CUSTOM',
  'MORTGAGE',
  'PROPERTY',
  'INVESTMENT',
  'CREDIT',
  'CRYPTOCURRENCY',
  'SUPERANNUATION',
]);

export type CategoryType = `${z.infer<typeof CategorySchema>}`;

export default CategorySchema;
