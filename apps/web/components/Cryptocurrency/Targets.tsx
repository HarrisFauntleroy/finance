import React from "react"

import { Flex, Progress, ProgressLabel, Stack, Text } from "@chakra-ui/react"
import { whatPercentOfXIsY } from "common"
import { useSession } from "next-auth/react"
import { Card } from "ui"
import { trpc } from "~/utils/trpc"

export const Targets = () => {
	// Use the session hook to get the user's session data
	const session = useSession()

	// Get the user's ID from the session data
	const userId = session?.data?.userId

	// Use the trpc hook to make a query for the user's cryptocurrency targets
	const { data } = trpc.assets.targets.useQuery({
		userId: userId || "",
	})

	// When the query is finished, render the targets in a card
	return (
		<Card height="max-content">
			<Stack>
				<Text>Target achieved</Text>
				<Stack width="200px" maxHeight="300px" overflow="scroll">
					{data?.map(
						({ balance, targetBalance, marketId, name }) =>
							Number(targetBalance) > 0 && (
								<Stack key={`progress${balance}`}>
									<Flex justifyContent="space-between">
										<Text>{marketId || name}</Text>
										<Text>
											{Number(balance) === 0
												? 100
												: whatPercentOfXIsY(
														Number(balance),
														Number(targetBalance)
												  ).toFixed(2)}
											%
										</Text>
									</Flex>

									<Progress
										value={Number(balance)}
										max={Number(targetBalance)}
										hasStripe={
											Number(balance) < Number(targetBalance) ? true : false
										}
										colorScheme={
											Number(balance) > Number(targetBalance)
												? "green"
												: Number(balance) === Number(targetBalance)
												? "green"
												: "blue"
										}
									>
										<ProgressLabel>
											{balance > (targetBalance || 0)
												? "OVER"
												: balance === targetBalance
												? "HOLDIng"
												: "UNDER"}
										</ProgressLabel>
									</Progress>
								</Stack>
							)
					)}
				</Stack>
			</Stack>
		</Card>
	)
}
