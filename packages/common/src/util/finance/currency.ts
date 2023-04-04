import { divide, multiply } from '../math';

import { Any } from 'currency.js';

export function getConversionRate(
  rates: { [key: string]: string },
  fromCurrency: string,
  toCurrency: string,
): { value: string; error?: string } {
  const fromRate = rates[fromCurrency.toUpperCase()];
  const toRate = rates[toCurrency.toUpperCase()];

  if (!fromRate) {
    return { value: '0', error: `Invalid from currency: ${fromCurrency}` };
  }

  if (!toRate) {
    return { value: '0', error: `Invalid to currency: ${toCurrency}` };
  }

  return { value: divide(toRate, fromRate) };
}

export function convertCurrency({
  exchangeRates,
  fromCurrency,
  toCurrency,
  amount,
}: {
  exchangeRates: Record<string, string>;
  fromCurrency: string;
  toCurrency: string;
  amount: Any;
}): string {
  // get the conversion rate using the provided exchange rates and currencies
  const { value: conversionRate } = getConversionRate(
    exchangeRates,
    fromCurrency,
    toCurrency,
  );

  // multiply the amount by the conversion rate and return the result
  return multiply(amount, conversionRate);
}
