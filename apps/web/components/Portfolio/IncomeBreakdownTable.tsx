import {
	Card,
	TableContainer,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Stat,
	Tfoot,
	Text,
	Table,
} from "@chakra-ui/react"
import React from "react"

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
				<Table variant="simple" size="sm">
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
