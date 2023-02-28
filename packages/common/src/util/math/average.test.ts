import { average } from "./average"

describe("average", () => {
	it("should calculate the average of a simple array of numbers", () => {
		const numbers = [1, 2, 3, 4, 5]
		const expected = 3
		const result = average(numbers)

		expect(result).toBe(expected)
	})

	it("should return 0 for an empty array", () => {
		const numbers: [] = []
		const expected = 0
		const result = average(numbers)

		expect(result).toBe(expected)
	})

	it("should return the only number in the array if the array contains only one number", () => {
		const numbers = [5]
		const expected = 5
		const result = average(numbers)

		expect(result).toBe(expected)
	})

	it("should calculate the average of a simple array of numbers", () => {
		const numbers = [1, 2, 3, 4, 5]
		const expected = 3
		const result = average(numbers)

		expect(result).toBe(expected)
	})

	it("should return 0 for an empty array", () => {
		const numbers: [] = []
		const expected = 0
		const result = average(numbers)

		expect(result).toBe(expected)
	})

	it("should return the only number in the array if the array contains only one number", () => {
		const numbers = [5]
		const expected = 5
		const result = average(numbers)

		expect(result).toBe(expected)
	})
})
