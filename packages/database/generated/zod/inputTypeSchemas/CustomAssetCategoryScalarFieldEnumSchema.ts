import { z } from 'zod';

export const CustomAssetCategoryScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'icon',
  'createdAt',
  'updatedAt',
  'deleted',
  'deletedAt',
]);

export default CustomAssetCategoryScalarFieldEnumSchema;
