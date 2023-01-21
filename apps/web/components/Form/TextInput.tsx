/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import type { InputProps as ChakraInputProps } from "@chakra-ui/react"
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react"
import type { ValidationRule } from "react-hook-form"
import { useFormContext } from "react-hook-form"

interface FormInputBase {
	id?: string
	name: string
	label: string
	hidden?: boolean
	required?: boolean
	inputProps?: ChakraInputProps
	error?: string
	validation?: Partial<{
		required: string | ValidationRule<boolean>
		minLength: ValidationRule<number>
		maxLength: ValidationRule<number>
	}>
}

interface FormInput extends FormInputBase {
	type: "text"
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
	name,
	label,
	hidden,
	inputProps,
	error,
	validation,
}: FormInputs) {
	const context = useFormContext()
	return (
		<FormControl
			isInvalid={!!error}
			display={hidden ? "none" : "flex"}
			flexDir="column"
		>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<Input
				id={name}
				{...context.register(name, validation)}
				{...inputProps}
			/>
			<FormErrorMessage>{error}</FormErrorMessage>
		</FormControl>
	)
}
