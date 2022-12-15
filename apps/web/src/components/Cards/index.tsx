/**
 * Generic Card
 */
import type { PropsWithChildren } from "react"
import React from "react"

import type { GridItemProps } from "@chakra-ui/react"
import { GridItem, useColorModeValue } from "@chakra-ui/react"

function Card({ children, ...props }: PropsWithChildren & GridItemProps) {
	return (
		<GridItem
			bg={useColorModeValue("gray.100", "gray.900")}
			boxShadow={{ base: "none", sm: "base" }}
			rounded={{ base: "none", sm: "lg" }}
			padding={{ base: "0.5rem" }}
			height="100%"
			w="100%"
			flex={1}
			{...props}
		>
			{children}
		</GridItem>
	)
}

export default Card
