import { z } from 'zod';

/////////////////////////////////////////
// CUSTOM ASSET CATEGORY SCHEMA
/////////////////////////////////////////

export const CustomAssetCategorySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  icon: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
  deletedAt: z.coerce.date().nullable(),
});

export type CustomAssetCategory = z.infer<typeof CustomAssetCategorySchema>;

export default CustomAssetCategorySchema;
