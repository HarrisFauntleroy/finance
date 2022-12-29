/**
 *
 * Debug component
 * Displays raw object data in a readable format
 * Only displays in development environment
 *
 */
import React from "react"

import { Heading, Stack } from "@chakra-ui/react"

/** This component will not show up in production */
export function Debug({ data }: { data: unknown }) {
	return process.env.NODE_ENV === "development" ? (
		<Stack mt={4} overflow="scroll" maxW="100vw">
			<Heading fontSize="16px">Raw data:</Heading>
			<pre style={{ fontSize: "11px" }}>{JSON.stringify(data, null, 4)}</pre>
		</Stack>
	) : null
}

/** If in development environment return true */
export const inDev = () => process.env.NODE_ENV === "development"
