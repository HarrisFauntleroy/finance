import React from "react"

import { Table as ChakraTable, Tbody, Td, Th, Tr } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { Card } from "ui"
import Currency from "~/components/Currency"
import { trpc } from "~/utils/trpc"

function OverviewCard() {
	const session = useSession()
	const userId = session?.data?.userId

	const { data, error, isLoading } = trpc.assets.overviewByUserId.useQuery({
		userId: userId || "",
	})

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error loading data</div>
	}

	return (
		<Card height="100%">
			<ChakraTable variant="simple" height="100%">
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
		</Card>
	)
}

OverviewCard.auth = true
export default OverviewCard
