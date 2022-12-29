/**
 * Wraps with default body styles
 */
import React, { type ReactNode } from "react"

import { Box } from "@chakra-ui/react"

export function Body({ children }: { children?: ReactNode }) {
	return (
		<Box transition=".3s ease" padding={{ base: "16px" }}>
			{children}
		</Box>
	)
}
