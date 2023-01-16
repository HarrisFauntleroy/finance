import type { PropsWithChildren } from "react"
import React from "react"

import { Grid } from "@chakra-ui/react"

export const Layout = ({ children }: PropsWithChildren) => {
	return (
		<Grid
			templateAreas={{
				sm: `"overview allocation"
						 "chart chart"
						 "income history"`,
				base: `"overview"
							 "history"
							 "chart"
							 "income"`,
			}}
			gridTemplateRows={{
				sm: "234px 1fr 1fr",
				base: "repeat(4,max-content)",
			}}
			gridTemplateColumns={{
				sm: "repeat(2, minmax(0,1fr))",
				base: "100%",
			}}
			gap={{ base: 0, sm: 2 }}
		>
			{children}
		</Grid>
	)
}
