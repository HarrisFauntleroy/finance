import { z } from 'zod';

export const AssetScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'institution',
  'currency',
  'apiKey',
  'apiSecret',
  'walletAddress',
  'balance',
  'costBasis',
  'realisedGain',
  'targetBalance',
  'interestBearingBalance',
  'incomeRate',
  'createdAt',
  'updatedAt',
  'deleted',
  'deletedAt',
  'account',
  'category',
  'categoryId',
  'marketId',
  'parentId',
  'userId',
  'status',
]);

export default AssetScalarFieldEnumSchema;
