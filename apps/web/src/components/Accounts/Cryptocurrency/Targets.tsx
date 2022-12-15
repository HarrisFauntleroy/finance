import React from "react"

import { Flex, Progress, ProgressLabel, Stack, Text } from "@chakra-ui/react"
import { whatPercentOfXIsY } from "common"
import { useSession } from "next-auth/react"
import Card from "~/components/Cards"
import { Loading } from "~/components/Loading"
import { trpc } from "~/utils/trpc"

export const Targets = () => {
	// Use the session hook to get the user's session data
	const session = useSession()

	// Get the user's ID from the session data
	const userId = session?.data?.userId

	// Use the trpc hook to make a query for the user's cryptocurrency targets
	const { data, status } = trpc.cryptocurrency.targets.useQuery({
		userId: userId || "",
	})

	// If the query is still loading, show a loading component
	if (status === "loading") {
		return <Loading />
	}

	// When the query is finished, render the targets in a card
	return (
		<Card height="max-content">
			<Stack>
				<Text>Target achieved</Text>
				<Stack width="200px" maxHeight="300px" overflow="scroll">
					{data?.map(
						({ balance, targetBalance, marketId, displayName }) =>
							Number(targetBalance) > 0 && (
								<Stack key={`progress${balance}`}>
									<Flex justifyContent="space-between">
										<Text>{marketId || displayName}</Text>
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
											{balance > targetBalance
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
