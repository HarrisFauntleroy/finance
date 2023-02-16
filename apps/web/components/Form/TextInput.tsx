import React from "react"

import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

interface FormInputBase {
	id?: string
	name: string
	label: string
	hidden?: boolean
	required?: boolean
	error?: string
}

interface FormInput extends FormInputBase {
	type: "text" | "date"
	options?: never
}

interface SelectFormInput extends FormInputBase {
	type: "select"
	options?: string[]
}

interface MultiSelectFormInput extends FormInputBase {
	type: "multi-select"
	options?: Record<string, unknown>[]
}

export type FormInputs = FormInput | SelectFormInput | MultiSelectFormInput

export function TextInput({
	label,
	name,
	error,
	hidden,
	...props
}: FormInputs) {
	const context = useFormContext()
	return (
		<FormControl
			isInvalid={!!error}
			display={hidden ? "none" : "flex"}
			flexDir="column"
		>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<Input {...props} {...context.register(name)} />
			<FormErrorMessage>{error}</FormErrorMessage>
		</FormControl>
	)
}
