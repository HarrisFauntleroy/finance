import { AccountConnectionSchema } from '../inputTypeSchemas/AccountConnectionSchema';
import { AssetStatusSchema } from '../inputTypeSchemas/AssetStatusSchema';
import { CategorySchema } from '../inputTypeSchemas/CategorySchema';

import { z } from 'zod';

/////////////////////////////////////////
// ASSET SCHEMA
/////////////////////////////////////////

export const AssetSchema = z.object({
  account: AccountConnectionSchema.nullable(),
  category: CategorySchema.nullable(),
  status: AssetStatusSchema.nullable(),
  id: z.string().cuid(),
  name: z.string(),
  institution: z.string().nullable(),
  currency: z.string(),
  apiKey: z.string().nullable(),
  apiSecret: z.string().nullable(),
  walletAddress: z.string().nullable(),
  balance: z.string(),
  costBasis: z.string(),
  realisedGain: z.string(),
  targetBalance: z.string().nullable(),
  interestBearingBalance: z.string().nullable(),
  incomeRate: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
  deletedAt: z.coerce.date().nullable(),
  categoryId: z.string().nullable(),
  marketId: z.string().nullable(),
  parentId: z.string().nullable(),
  userId: z.string(),
});

export type Asset = z.infer<typeof AssetSchema>;

export default AssetSchema;
