import { z } from "zod"

// Returns a zod-type decimal
export const date = () =>
	z
		.instanceof(Date)
		.or(z.string())
		.refine((value) => {
			try {
				return new Date(value)
			} catch (error) {
				return false
			}
		})
		.transform((value) => new Date(value))
