import { calculateSMA } from "./sma"

// Calculate the standard deviation of an array of prices's prices over a given number of days
export function calculateStandardDeviation(
	prices: number[],
	days: number
): number {
	// Calculate the SMA of then array of prices's prices over the past `days` days
	const sma = calculateSMA(prices, days)

	// Initialize the sum of squared differences
	let sumSquaredDifferences = 0

	// Loop through the past `days` days of price data using the `forEach` method
	prices.forEach((price) => {
		// Add the squared difference between the current price and the SMA to the sum of squared differences
		sumSquaredDifferences += (price - sma) ** 2
	})

	// Return the standard deviation by taking the square root of the average squared difference
	return Math.sqrt(sumSquaredDifferences / days)
}
