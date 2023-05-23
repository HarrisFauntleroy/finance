import { average } from "../math";

// Calculate the simple moving average (SMA) for an array of prices over a given number of days
export function calculateSMA(prices: number[], days: number): number {
  // Extract the first `days` prices from the `prices` array
  const smaPrices = prices.slice(0, days);

  // Calculate the SMA by averaging the `smaPrices`
  return average(smaPrices);
}
