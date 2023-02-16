import React from "react"

import { Stack } from "@chakra-ui/react"
import { Table } from "ui"
import { cryptocurrencyColumns } from "~/components/Markets/Cryptocurrency/columns"
import { trpc } from "~/utils/trpc"

export const Cryptocurrency = () => {
	const { data } = trpc.markets.cryptocurrency.useQuery()

	return (
		<Stack>
			<Table
				id="Cryptocurrency"
				data={data || []}
				columns={cryptocurrencyColumns}
				getRowCanExpand
				paginationEnabled
			/>
		</Stack>
	)
}
