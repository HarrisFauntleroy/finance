import React from "react"

import {
	Table as ChakraTable,
	Stack,
	Tbody,
	Td,
	Text,
	Th,
	Tr,
} from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { Card } from "ui"
import Currency from "~/components/Currency"
import { trpc } from "~/utils/trpc"

function OverviewCard() {
	const session = useSession()
	const userId = session?.data?.userId

	const { data } = trpc.assets.overviewByUserId.useQuery({
		userId: userId || "",
	})

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
				<ChakraTable variant="simple">
					<Tbody>
						<Tr>
							<Th>Value</Th>
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
			</Stack>
		</Card>
	)
}

OverviewCard.auth = true
export default OverviewCard
