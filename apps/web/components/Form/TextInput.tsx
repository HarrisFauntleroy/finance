/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import type { InputProps as ChakraInputProps } from "@chakra-ui/react"
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react"
import type { UseFormRegister, ValidationRule } from "react-hook-form"

interface InputProps {
	name: string
	label: string
	inputProps?: ChakraInputProps
	error?: string
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	register: UseFormRegister<any>
	validation?: Partial<{
		required: string | ValidationRule<boolean>
		minLength: ValidationRule<number>
		maxLength: ValidationRule<number>
	}>
}

export const TextInput = ({
	name,
	label,
	inputProps,
	register,
	error,
	validation,
}: InputProps) => (
	<FormControl isInvalid={!!error}>
		<FormLabel htmlFor={name}>{label}</FormLabel>
		<Input id={name} {...register(name, validation)} {...inputProps} />
		<FormErrorMessage>{error}</FormErrorMessage>
	</FormControl>
)
