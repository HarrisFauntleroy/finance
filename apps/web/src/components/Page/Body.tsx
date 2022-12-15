/**
 * Wraps with default body styles
 */
import type { PropsWithChildren } from "react"
import React from "react"

import { Box } from "@chakra-ui/react"

export function Body({ children }: PropsWithChildren) {
	return (
		<Box transition=".3s ease" padding={{ base: "16px" }}>
			{children}
		</Box>
	)
}
