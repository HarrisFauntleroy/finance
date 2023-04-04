import { calculateAverageGain } from './averageGain';
import { calculateAverageLoss } from './averageLoss';

// RSI = 100 - 100 / (1 + (average gain / average loss))

export function calculateRSI(prices: number[]): number {
  // Calculate the average gain and average loss over the past 14 days
  const averageGain = calculateAverageGain(prices, 14);
  const averageLoss = calculateAverageLoss(prices, 14);

  // Use the average gain and loss to calculate the relative strength
  const relativeStrength = averageGain / averageLoss;

  // Use the relative strength to calculate the RSI
  return 100 - 100 / (1 + relativeStrength);
}
