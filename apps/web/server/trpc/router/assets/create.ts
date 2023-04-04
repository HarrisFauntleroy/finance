import { prisma } from 'database';
import {
  AccountConnection,
  AssetStatus,
  Category,
} from 'database/generated/prisma-client';

import type { Asset } from 'database/generated/prisma-client';
import { z } from 'zod';

export const createAssetInput = z.object({
  userId: z.string().optional(),
  marketId: z.string().optional(),
  categoryId: z.string().optional(),
  parentId: z.string().optional(),
  name: z.string(),
  account: z.nativeEnum(AccountConnection),
  currency: z.string().max(3).min(3),
  category: z.nativeEnum(Category),
  balance: z.string(),
  targetBalance: z.string(),
  costBasis: z.string(),
  interestBearingBalance: z.string(),
  incomeRate: z.string(),
  walletAddress: z.string(),
  apiKey: z.string(),
  apiSecret: z.string(),
  institution: z.string(),
  realisedGain: z.string(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  deleted: z.boolean(),
  deletedAt: z.date().nullable(),
  status: z.nativeEnum(AssetStatus),
});

export const lol: Asset = {
  userId: 'lol',
  id: '',
  name: '',
  institution: '',
  currency: '',
  apiKey: '',
  apiSecret: '',
  walletAddress: '',
  balance: '',
  costBasis: '',
  realisedGain: '',
  targetBalance: '',
  interestBearingBalance: '',
  incomeRate: '',
  createdAt: undefined,
  updatedAt: undefined,
  deleted: false,
  deletedAt: undefined,
  account: 'NONE',
  category: 'LOAN',
  categoryId: '',
  marketId: '',
  parentId: '',
  status: 'CONNECTED',
};

export async function createAsset(data: z.infer<typeof createAssetInput>) {
  return await prisma.asset.create({
    data,
  });
}

createAsset(lol);
