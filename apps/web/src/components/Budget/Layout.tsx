import type { PropsWithChildren } from "react"
import React from "react"

import { Grid } from "@chakra-ui/react"

export const Layout = ({ children }: PropsWithChildren) => {
	return (
		<Grid
			templateAreas={{
				sm: `"date-picker date-picker ."
						 "spending-breakdown spending-breakdown stats"
						 "spending-breakdown spending-breakdown stats"
						 "spending-breakdown spending-breakdown stats"
						 "accounts-overview accounts-overview stats"
						 "period-summary period-summary ."
						 "budget-items . ."`,
				base: `"date-picker"
							 "stats"
							 "spending-breakdown"
							 "accounts-overview"
							 "period-summary"`,
			}}
			gridTemplateRows={{
				sm: "repeat(6, max-content)",
				base: "repeat(5, max-content)",
			}}
			gridTemplateColumns={{
				sm: "2fr 2fr 1fr",
				base: "100%",
			}}
			gap={{ base: 0, sm: 2 }}
		>
			{children}
		</Grid>
	)
}
