export const mapAsync = async (array: unknown[], callbackfn: () => void) =>
	Promise.all(array.map(callbackfn))

// So you can already go arr -> obj with Object.from(arr) ? maybe
// What does this do
export const flattenArrToObj = (
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	arr: Record<string, any>[],
	key: string | number,
	value: string
) =>
	arr.reduce(
		(acc, val) => ({
			...acc,
			[`${val[key]}`]: val[value],
		}),
		{}
	)
