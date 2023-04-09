import { z } from 'zod';

/////////////////////////////////////////
// ASSET LABEL SCHEMA
/////////////////////////////////////////

export const AssetLabelSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  icon: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
  deletedAt: z.coerce.date().nullable(),
  assetId: z.string().nullable(),
})

export type AssetLabel = z.infer<typeof AssetLabelSchema>

export default AssetLabelSchema;
