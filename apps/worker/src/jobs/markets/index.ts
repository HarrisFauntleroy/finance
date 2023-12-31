import { updateCryptoMarkets } from "./coingecko";
import { updateExchangeRates } from "./openExchangeRates";

export const markets = async () => {
  await updateExchangeRates();
  await updateCryptoMarkets();
};
