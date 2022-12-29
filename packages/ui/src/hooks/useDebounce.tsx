import React, { useEffect, useState } from "react"

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
