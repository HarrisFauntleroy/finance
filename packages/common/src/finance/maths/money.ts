// Calculate the simple moving average of an input array
export function findSimpleMovingAverage(inputArray: (string | number)[]) {
	// Check if the input array exists
	if (!inputArray) {
		return 0
	}

	// Convert all elements in the input array to numbers and sum them
	const sum = inputArray.reduce(
		(accumulator: number, nextValue: string | number) =>
			accumulator + Number(nextValue),
		0
	)

	// Divide the sum by the length of the input array to find the average
	return sum / inputArray.length
}
