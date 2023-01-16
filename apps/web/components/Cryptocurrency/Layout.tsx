import type { PropsWithChildren } from "react"
import React from "react"

import { Grid } from "@chakra-ui/react"

export const Layout = ({ children }: PropsWithChildren) => {
	return (
		<Grid
			templateAreas={{
				sm: `"overview overview income income"
						 "assets assets assets assets"
						 "targets targets targets targets"`,
				base: `"overview"
							 "income"
							 "assets"
							 "targets"`,
			}}
			gridTemplateRows={{
				sm: "max-content 1fr",
				base: "repeat(4,max-content)",
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
