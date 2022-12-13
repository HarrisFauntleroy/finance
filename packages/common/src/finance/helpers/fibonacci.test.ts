import { calculateFibonacciResistance } from "./fibonacci"

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

describe("calculateFibonacciResistance", () => {
	it("should calculate the resistance level using Fibonacci levels", () => {
		const prices = [100, 105, 110, 115, 120]
		const resistanceLevel = calculateFibonacciResistance(prices)

		expect(resistanceLevel).toBe(115.72)
	})

	it("should handle an empty array of prices", () => {
		const prices: number[] = []
		const resistanceLevel = calculateFibonacciResistance(prices)

		expect(resistanceLevel).toBe(0)
	})

	it("should handle an array of prices with the same value", () => {
		const prices = [100, 100, 100, 100, 100]
		const resistanceLevel = calculateFibonacciResistance(prices)

		expect(resistanceLevel).toBe(100)
	})

	it("should handle an array of negative prices", () => {
		const prices = [-100, -105, -110, -115, -120]
		const resistanceLevel = calculateFibonacciResistance(prices)

		expect(resistanceLevel).toBe(-104.28)
	})

	it("should handle an array of prices with very large or very small values", () => {
		const prices = [1e6, 1e12, 1e-6, 1e-12]
		const resistanceLevel = calculateFibonacciResistance(prices)

		expect(resistanceLevel).toBeCloseTo(786000000000)
	})
})
