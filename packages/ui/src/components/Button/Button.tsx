import type { ReactNode } from "react"
import React from "react"

import type { ButtonProps } from "@chakra-ui/react"
import { Button as ChakraButton } from "@chakra-ui/react"

export const Button = ({
	children,
	...props
}: { children?: ReactNode } & ButtonProps) => {
	return <ChakraButton {...props}>{children}</ChakraButton>
}
