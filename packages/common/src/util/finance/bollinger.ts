import { calculateStandardDeviation } from './sd';
import { calculateSMA } from './sma';

// Bollinger bands: These are bands plotted two standard deviations away from a cryptocurrency's simple moving average (SMA), which can be used to identify overbought and oversold conditions. When the price of a cryptocurrency reaches the upper Bollinger band, it may be overbought and a potential selling opportunity, while when it reaches the lower Bollinger band, it may be oversold and a potential buying opportunity.
export function calculateBollingerBands(prices: number[]): {
  upper: number;
  lower: number;
} {
  // Calculate the 20-day simple moving average (SMA) of then array of prices's prices
  const sma = calculateSMA(prices, 20);

  // Calculate the standard deviation of then array of prices's prices over the past 20 days
  const standardDeviation = calculateStandardDeviation(prices, 20);

  // Calculate the upper and lower Bollinger bands by adding and subtracting twice the standard deviation from the SMA
  return {
    upper: sma + 2 * standardDeviation,
    lower: sma - 2 * standardDeviation,
  };
}
