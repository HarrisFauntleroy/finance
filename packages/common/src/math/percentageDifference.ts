/**
 * Percentage difference seeks to understand
 * the percentage of the difference when compared to
 * the average between two numbers.
 *
 * When to use? When there is no obvious way of choosing
 * which value is the "reference" value.
 */
export function percentageDifference(value1: number, value2: number) {
	const range = value2 - value1
	const average = (value2 + value1) / 2
	return (range / average) * 100
}
