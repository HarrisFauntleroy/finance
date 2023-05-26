import { Stat } from "../Stat";

import { Flex } from "@chakra-ui/react";

function IncomeOverviewCard() {
  return (
    <Flex flexDir="column" height="100%" gap="8px">
      <Flex height="100%" flex={1} gap="8px">
        <Stat label="Statistic WIP" />
        <Stat label="Statistic WIP" />
      </Flex>
      <Flex height="100%" flex={1} gap="8px">
        <Stat label="Statistic WIP" />
        <Stat label="Statistic WIP" />
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
  );
}

export default IncomeOverviewCard;
