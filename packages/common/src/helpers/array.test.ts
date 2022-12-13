import { sumArrayByKey } from "./array"

describe("sumArrayByKey", () => {
	it('should return "0" for an empty array', () => {
		const array: [] = []
		const key = "value"
		const precision = 2

		const expected = "0.00"
		const result = sumArrayByKey(array, key, precision)

		expect(result).toEqual(expected)
	})

	it("should return the sum of the values for the specified key", () => {
		const array = [
			{ id: 1, value: 10 },
			{ id: 2, value: 20 },
			{ id: 3, value: 30 },
		]
		const key = "value"
		const precision = 2

		const expected = "60.00"
		const result = sumArrayByKey(array, key, precision)

		expect(result).toEqual(expected)
	})

	it("should return the sum of the specified number of decimal places", () => {
		const array = [
			{ id: 1, value: 10 },
			{ id: 2, value: 20.12345 },
			{ id: 3, value: 30.6789 },
		]
		const key = "value"
		const precision = 3

		const expected = "60.802"
		const result = sumArrayByKey(array, key, precision)

		expect(result).toEqual(expected)
	})
})
