import React from "react"

import {
	Card,
	Stat,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react"

export const IncomeBreakdownTable = () => {
	return (
		<Card>
			<Text
				variant="h3"
				fontSize={{ base: "lg", sm: "2xl" }}
				fontWeight="bold"
				lineHeight="1.2"
			>
				Income Breakdown
			</Text>
			<TableContainer>
				<Table>
					<Thead>
						<Tr>
							<Th />
							<Th textAlign="right">Daily</Th>
							<Th textAlign="right">Weekly</Th>
							<Th textAlign="right">Monthly</Th>
							<Th textAlign="right">Annually</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Th>Staking</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
						<Tr>
							<Th>Rent</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
						<Tr>
							<Th>Dividends</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
						<Tr>
							<Th>Distributions</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
						<Tr>
							<Th>Mining</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
						<Tr>
							<Th>Lending</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
						<Tr>
							<Th>Interest</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>Total</Th>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
							<Td isNumeric>
								<Stat>$0</Stat>
							</Td>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</Card>
	)
}
