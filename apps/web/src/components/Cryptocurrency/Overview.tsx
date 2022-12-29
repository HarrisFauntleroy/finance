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
import Currency from "~/components/Currency"
import { Loading, Card } from "ui"
import { trpc } from "~/utils/trpc"

function OverviewCard() {
	const session = useSession()
	const userId = session?.data?.userId

	const { data, status } = trpc.cryptocurrency.overviewByUserId.useQuery({
		userId: userId || "",
	})

	if (status === "loading") {
		return <Loading />
	}

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
				<ChakraTable variant="simple" size="sm">
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

export default OverviewCard
