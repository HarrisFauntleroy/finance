import type { PropsWithChildren, ReactElement } from "react"
import React, { Children } from "react"

import type { SimpleGridProps } from "@chakra-ui/react"
import { GridItem, SimpleGrid } from "@chakra-ui/react"

export function Grid({
	children,
	...props
}: PropsWithChildren & SimpleGridProps) {
	return (
		<SimpleGrid
			columns={{ base: 1, sm: 2, md: 3 }}
			padding={0}
			width="100%"
			minChildWidth="300px"
			gridAutoFlow="dense"
			gap={2}
			{...props}
		>
			{Children.map(children as ReactElement, (child) => (
				<GridItem
					key={child.key}
					style={{ height: "100%", width: "100%" }}
					as={child.type}
					{...child.props}
				/>
			))}
		</SimpleGrid>
	)
}
