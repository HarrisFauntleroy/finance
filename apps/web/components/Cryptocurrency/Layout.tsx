import type { PropsWithChildren } from "react"
import React from "react"

import { Grid } from "@chakra-ui/react"

export const Layout = ({ children }: PropsWithChildren) => {
	return (
		<Grid
			paddingY="8px"
			height="100%"
			gridAutoFlow="dense"
			templateAreas={{
				sm: `"overview overview allocation allocation"
						 "chart chart chart chart"
						 "assets assets assets assets"
						 "history history history history"`,
				base: `"overview"
							 "allocation"
							 "chart"
							 "assets"
							 "history"`,
			}}
			gridTemplateRows={{
				sm: "max-content max-content max-content 1fr max-content",
				base: "repeat(4, max-content)",
			}}
			gridTemplateColumns={{
				sm: "repeat(4, 1fr)",
				base: "100%",
			}}
			gap={{ base: 0, sm: 2 }}
		>
			{children}
		</Grid>
	)
}
