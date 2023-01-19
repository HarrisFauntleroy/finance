import React from "react"

import { Stat } from "../Stat"
import { Flex } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { trpc } from "~/utils/trpc"

function IncomeOverviewCard() {
	const session = useSession()
	const userId = session?.data?.userId

	const { data } = trpc.cryptocurrency.overviewByUserId.useQuery({
		userId: userId || "",
	})

	return (
		<Flex flexDir="column" height="100%" gap="8px">
			<Flex height="100%" flex={1} gap="8px">
				<Stat
					value={data?.totalEstimatedYearlyReturn}
					label="Staking returns daily"
				/>
				<Stat />
			</Flex>
			<Flex height="100%" flex={1} gap="8px">
				<Stat />
				<Stat />
			</Flex>
		</Flex>
		// <Card width='100%' height='100%' flex={1}>
		// 	<Stack>
		// 		<Text
		// 			variant="h3"
		// 			fontSize={{ base: "lg", sm: "2xl" }}
		// 			fontWeight="bold"
		// 			lineHeight="1.2"
		// 		>
		// 			Income Breakdown
		// 		</Text>
		// 		<TableContainer>
		// 			<ChakraTable variant="simple" size="sm">
		// 				<Thead>
		// 					<Tr textAlign="right">
		// 						<Th />
		// 						<Th textAlign="right">Daily</Th>
		// 						<Th textAlign="right">Weekly</Th>
		// 						<Th textAlign="right">Monthly</Th>
		// 						<Th textAlign="right">Annually</Th>
		// 					</Tr>
		// 				</Thead>
		// 				<Tbody>
		// 					<Tr>
		// 						<Th>Staking </Th>
		// 						<Td isNumeric>
		// 							<Stat>
		// 								<Currency
		// 									value={currency(String(data?.totalEstimatedYearlyReturn))
		// 										.divide(365)
		// 										.toString()}
		// 								/>
		// 							</Stat>
		// 						</Td>
		// 						<Td isNumeric>
		// 							<Stat>
		// 								<Currency
		// 									value={currency(String(data?.totalEstimatedYearlyReturn))
		// 										.divide(52)
		// 										.toString()}
		// 								/>
		// 							</Stat>
		// 						</Td>
		// 						<Td isNumeric>
		// 							<Stat>
		// 								<Currency
		// 									value={currency(String(data?.totalEstimatedYearlyReturn))
		// 										.divide(12)
		// 										.toString()}
		// 								/>
		// 							</Stat>
		// 						</Td>
		// 						<Td isNumeric>
		// 							<Stat>
		// 								<Currency
		// 									value={currency(
		// 										String(data?.totalEstimatedYearlyReturn)
		// 									).toString()}
		// 								/>
		// 							</Stat>
		// 						</Td>
		// 					</Tr>
		// 					<Tr>
		// 						<Th>Farming</Th>
		// 						<Td isNumeric>
		// 							<Stat>$0</Stat>
		// 						</Td>
		// 						<Td isNumeric>
		// 							<Stat>$0</Stat>
		// 						</Td>
		// 						<Td isNumeric>
		// 							<Stat>$0</Stat>
		// 						</Td>
		// 						<Td isNumeric>
		// 							<Stat>$0</Stat>
		// 						</Td>
		// 					</Tr>
		// 					<Tr>
		// 						<Th>Mining</Th>
		// 						<Td isNumeric>
		// 							<Stat>$0</Stat>
		// 						</Td>
		// 						<Td isNumeric>
		// 							<Stat>$0</Stat>
		// 						</Td>
		// 						<Td isNumeric>
		// 							<Stat>$0</Stat>
		// 						</Td>
		// 						<Td isNumeric>
		// 							<Stat>$0</Stat>
		// 						</Td>
		// 					</Tr>

		// 					<Tr>
		// 						<Th>Total</Th>
		// 						<Td isNumeric>
		// 							<Stat>
		// 								<Currency
		// 									value={currency(String(data?.totalEstimatedYearlyReturn))
		// 										.divide(365)
		// 										.toString()}
		// 								/>
		// 							</Stat>
		// 						</Td>
		// 						<Td isNumeric>
		// 							<Stat>
		// 								<Currency
		// 									value={currency(String(data?.totalEstimatedYearlyReturn))
		// 										.divide(52)
		// 										.toString()}
		// 								/>
		// 							</Stat>
		// 						</Td>
		// 						<Td isNumeric>
		// 							<Stat>
		// 								<Currency
		// 									value={currency(String(data?.totalEstimatedYearlyReturn))
		// 										.divide(12)
		// 										.toString()}
		// 								/>
		// 							</Stat>
		// 						</Td>
		// 						<Td isNumeric>
		// 							<Stat>
		// 								<Currency
		// 									value={currency(
		// 										String(data?.totalEstimatedYearlyReturn)
		// 									).toString()}
		// 								/>
		// 							</Stat>
		// 						</Td>
		// 					</Tr>
		// 				</Tbody>
		// 			</ChakraTable>
		// 		</TableContainer>
		// 	</Stack>
		// </Card>
	)
}

export default IncomeOverviewCard
