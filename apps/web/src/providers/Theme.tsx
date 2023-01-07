import type { PropsWithChildren } from "react"
import React from "react"

import { GlobalStyle, ChakraProvider as Provider } from "@chakra-ui/react"
import { theme } from "~/styles/theme"

export default function ChakraProvider({ children }: PropsWithChildren) {
	return (
		<Provider theme={theme}>
			<GlobalStyle />
			{children}
		</Provider>
	)
}
