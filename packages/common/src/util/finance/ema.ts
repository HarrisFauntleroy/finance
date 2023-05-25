import { average } from "../math";

export function calculateEMA(prices: number[], days: number): number {
  const multiplier = 2 / (days + 1);

  let ema = average(prices.slice(0, days));

  prices.slice(days).forEach((price) => {
    ema = (price - ema) * multiplier + ema;
  });

  return ema;
}
