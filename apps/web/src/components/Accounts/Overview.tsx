import React from "react"

import {
	Table as ChakraTable,
	Stack,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Tr,
} from "@chakra-ui/react"
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import Card from "~/components/Cards"
import Currency from "~/components/Currency"
import type { AppRouter } from "~/server/trpc/router/_app"

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>

interface OverviewProps {
	data?: RouterOutput["accounts"]["byUserId"]
}

function Overview({ data }: OverviewProps) {
	return (
		<Card>
			<Stack>
				<Text
					variant="h3"
					fontSize={{ base: "lg", sm: "2xl" }}
					fontWeight="bold"
					lineHeight="1.2"
				>
					Overview
				</Text>
				<TableContainer>
					<ChakraTable variant="simple" size="sm">
						<Tbody>
							<Tr>
								<Th>Net Worth</Th>
								<Td isNumeric>
									<Currency value={data?.totalValue} />
								</Td>
							</Tr>
							<Tr>
								<Th>Cost Basis</Th>
								<Td isNumeric>
									<Currency value={data?.totalCostBasis} />
								</Td>
							</Tr>
							<Tr>
								<Th>Unrealized Gains</Th>
								<Td isNumeric>
									<Currency value={data?.unrealisedGain} />
								</Td>
							</Tr>
							<Tr>
								<Th>Realized Gains</Th>
								<Td isNumeric>
									<Currency value={0} />
								</Td>
							</Tr>
							<Tr>
								<Th>Saleable Assets</Th>
								<Td isNumeric>
									<Currency value={data?.saleableValue} />
								</Td>
							</Tr>
						</Tbody>
					</ChakraTable>
				</TableContainer>
			</Stack>
		</Card>
	)
}

export default Overview
