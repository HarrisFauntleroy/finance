import { calculateBollingerBands } from "./bollinger"

describe("calculateBollingerBands", () => {
	it("should calculate the Bollinger bands for a simple array of numbers", () => {
		const prices = [1, 2, 3, 4, 5]
		const expected = { upper: 4.414213562373095, lower: 1.5857864376269049 }
		const result = calculateBollingerBands(prices)

		expect(result).toEqual(expected)
	})

	it("should return 0 for both the upper and lower bands for an empty array", () => {
		const prices: [] = []
		const expected = { upper: 0, lower: 0 }
		const result = calculateBollingerBands(prices)

		expect(result).toEqual(expected)
	})

	it("should return the same number for both the upper and lower bands if the array contains only one number", () => {
		const prices = [5]
		const expected = { upper: 5, lower: 5 }
		const result = calculateBollingerBands(prices)

		expect(result).toEqual(expected)
	})
})
