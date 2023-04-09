import { AccountConnectionSchema } from '../inputTypeSchemas/AccountConnectionSchema';

import { z } from 'zod';

/////////////////////////////////////////
// CRYPTOCURRENCY SCHEMA
/////////////////////////////////////////

export const CryptocurrencySchema = z.object({
  accountConnection: AccountConnectionSchema.nullable(),
  id: z.string().cuid(),
  displayName: z.string(),
  currency: z.string(),
  balance: z.string(),
  costBasis: z.string(),
  realisedGain: z.string(),
  apiKey: z.string().nullable(),
  apiSecret: z.string().nullable(),
  walletAddress: z.string().nullable(),
  targetBalance: z.string(),
  interestBearingBalance: z.string(),
  incomeRate: z.string(),
  marketId: z.string().nullable(),
  parentId: z.string().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deleted: z.boolean(),
  deletedAt: z.coerce.date().nullable(),
});

export type Cryptocurrency = z.infer<typeof CryptocurrencySchema>;

export default CryptocurrencySchema;
