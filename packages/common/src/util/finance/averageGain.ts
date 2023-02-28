// Calculate the average gain over a given number of days
// avgGain = totalGain / numDays
export function calculateAverageGain(prices: number[], days: number): number {
	// Extract the first days prices from the prices array
	const gainPrices = prices.slice(0, days)
	// Initialize the total gain and the number of days for which there is gain data
	let totalGain = 0
	let numDays = 0

	// Loop through the `gainPrices` array and compare each price to the next price in the `prices` array
	gainPrices.forEach((currentPrice, index) => {
		const nextPrice = prices[index + 1]

		// If there is gain data for this day, add it to the total gain and increment the number of days
		if (nextPrice && currentPrice > nextPrice) {
			totalGain += currentPrice - nextPrice
			numDays++
		}
	})

	// Check if there are any days for which there is gain data
	if (numDays === 0) {
		// Return 1 if there are no days with gain data
		return 1
	} else {
		// Return the average gain by dividing the total gain by the number of days
		return totalGain / numDays
	}
}
