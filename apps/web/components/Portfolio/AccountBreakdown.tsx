import React from "react"

import { Stack, Text } from "@chakra-ui/react"

export const AccountBreakdown = () => {
	return (
		<Stack style={{ padding: "8px" }}>
			<Text>Overview</Text>
			<ul>
				<ul>
					<li>CREDIT</li>
					<li>1 active account</li>
				</ul>
				<ul>
					<li>CRYPTO</li>
					<li>2 active account</li>
				</ul>
				<ul>
					<li>STOCK</li>
					<li>1 active account</li>
				</ul>
			</ul>
		</Stack>
	)
}
