import type { InputHTMLAttributes } from "react"
import React, { useEffect, useState } from "react"

import { useDebounce } from "../../hooks/useDebounce"
import { Input } from "@chakra-ui/react"

export function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number
	onChange: (value: string | number) => void
	debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
	const [value, setValue] = useState(initialValue)
	const [debouncedValue] = useDebounce(value, debounce)

	useEffect(() => {
		setValue(initialValue)
	}, [initialValue, setValue])

	useEffect(() => {
		onChange(debouncedValue)
	}, [debouncedValue, onChange])

	return (
		<Input
			{...props}
			size="md"
			variant="outline"
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	)
}
