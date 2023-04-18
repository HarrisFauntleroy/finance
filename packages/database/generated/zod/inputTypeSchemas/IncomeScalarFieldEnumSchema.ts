import { z } from 'zod';

export const IncomeScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'payFrequency',
  'grossAmount',
  'grossFrequency',
  'userId',
  'createdAt',
  'updatedAt',
  'deleted',
  'deletedAt',
]);

export default IncomeScalarFieldEnumSchema;
