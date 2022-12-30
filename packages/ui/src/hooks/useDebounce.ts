import { useEffect, useState } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce(value: any, debounce: number) {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value)
		}, debounce)

		return () => clearTimeout(timeout)
	}, [value, debounce])

	return [debouncedValue, setDebouncedValue]
}
