/** Arithmetic mean or Average */
export function average(array: number[]) {
	return array.reduce((prev, next) => prev + next, 0) / array.length
}
