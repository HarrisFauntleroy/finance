export const isNumeric = (value: string | number): boolean =>
	value != null && value !== "" && !isNaN(Number(value.toString()))
