import { updateCryptoMarkets } from './crypto';
import { updateExchangeRates } from './exchangeRates';

export const marketData = async () => {
  await updateExchangeRates();
  await updateCryptoMarkets();
};
