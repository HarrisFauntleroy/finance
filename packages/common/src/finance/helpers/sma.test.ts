import { calculateSMA } from "./sma"

describe("calculateSMA", () => {
	it("should return 0 for an empty array of prices", () => {
		const prices: [] = []
		const days = 5
		const expectedResult = 0

		const result = calculateSMA(prices, days)
		expect(result).toEqual(expectedResult)
	})

	it("should return the only value in the array for an array of prices with only one value", () => {
		const prices = [100]
		const days = 5
		const expectedResult = 100

		const result = calculateSMA(prices, days)
		expect(result).toEqual(expectedResult)
	})

	it("should return the correct SMA for an array of prices with multiple values", () => {
		const prices = [100, 105, 110, 115, 120]
		const days = 5
		const expectedResult = 110

		const result = calculateSMA(prices, days)
		expect(result).toEqual(expectedResult)
	})
})
