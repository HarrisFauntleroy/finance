import { getExchangeRates, getUserCurrency } from '../../util';
import { getUserById } from './getUserById';
import { calculateAssetValue, calculateAssetValueOverview } from 'common';
import { Prisma } from 'database/generated/prisma-client';

export const calculateAssetValuesTotals = async (userId: string) => {
  const user: Prisma.PromiseReturnType<typeof getUserById> = await getUserById(
    userId,
  );

  if (!user) {
    throw new Error('Not found');
  }

  const { assets } = user;

  const userCurrency = await getUserCurrency(userId);
  const exchangeRates = await getExchangeRates();
  const calculatedAssets = assets.map((asset) =>
    calculateAssetValue(asset, exchangeRates, userCurrency),
  );

  const assetOverview = calculateAssetValueOverview(calculatedAssets);

  return {
    userCurrency,
    ...assetOverview,
  };
};
