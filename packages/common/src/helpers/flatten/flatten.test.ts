import { flat } from "./index"

describe("flatten", () => {
	it("flattens a nested object", () => {
		const input = {
			a: 1,
			b: {
				c: 2,
				d: 3,
			},
		}

		const expected = {
			a: 1,
			"b.c": 2,
			"b.d": 3,
		}

		const result = flat(input)

		console.log(result)
		console.log(expected)

		expect(result).toEqual(expected)
	})

	it("returns an empty object for an empty input object", () => {
		expect(flat({})).toEqual({})
	})

	it("returns the input object for a flat object", () => {
		const input = { a: 1, b: 2, c: 3 }

		const result = flat(input)

		expect(result).toEqual(input)
	})
})
