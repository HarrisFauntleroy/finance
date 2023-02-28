import { calculateEMA } from "./ema"

// Moving average convergence divergence (MACD): This is a trend-following momentum indicator that shows the relationship between two moving averages of a cryptocurrency's price. By comparing the MACD to a signal line, you can identify whether a cryptocurrency is trending upwards or downwards and use this information to inform your buying or selling decisions.
export function calculateMACD(prices: number[]): number {
	// Calculate the 26-day and 12-day exponential moving averages (EMAs) of then array of prices's prices
	const ema26 = calculateEMA(prices, 26)
	const ema12 = calculateEMA(prices, 12)

	// Subtract the 12-day EMA from the 26-day EMA to get the MACD
	return ema26 - ema12
}
