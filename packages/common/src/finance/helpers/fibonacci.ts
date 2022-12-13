export function calculateFibonacciResistance(prices: number[]): number | null {
	// Return 0 if the array is empty
	if (prices.length === 0) {
		return 0
	}

	// Find the highest and lowest prices in the array
	const highestPrice = Math.max(...prices)
	const lowestPrice = Math.min(...prices)

	// Calculate the Fibonacci retracement levels
	const fibonacciLevels = [
		lowestPrice + (highestPrice - lowestPrice) * 0.236,
		lowestPrice + (highestPrice - lowestPrice) * 0.382,
		lowestPrice + (highestPrice - lowestPrice) * 0.5,
		lowestPrice + (highestPrice - lowestPrice) * 0.618,
		lowestPrice + (highestPrice - lowestPrice) * 0.786,
	]

	// The resistance level is the highest Fibonacci level
	return Math.max(...fibonacciLevels)
}
