import { average } from "../math";

/**
 * Exponential Moving Average
 * The standard exponential moving average formula
 * converts the time to a fraction
 * EMA% = 2/(n + 1) where n is the number of days
 * For example, the EMA% for 14 days is 2/(14 days +1) = 13.3%.
 */
export function calculateEMA(prices: number[], days: number): number {
  // Calculate the weighting multiplier
  const multiplier = 2 / (days + 1);

  // Initialize the EMA with the average of the first `days` prices
  let ema = average(prices.slice(0, days));

  // Use a forEach loop to iterate over the remaining prices
  prices.slice(days).forEach((price) => {
    // Update the EMA using the current price and the weighting multiplier
    ema = (price - ema) * multiplier + ema;
  });

  // Return the EMA
  return ema;
}
