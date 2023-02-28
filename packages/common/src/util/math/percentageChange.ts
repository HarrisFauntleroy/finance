/**
 * Percentage change identifies the percentage
 * between the two numbers
 */
export function percentageChange(initialValue: number, finalValue: number) {
	return ((finalValue - initialValue) / initialValue) * 100
}
