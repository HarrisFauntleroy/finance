import React from "react"

import { Stack } from "@chakra-ui/react"
import NextError from "next/error"
import { Table } from "ui"
import { cryptocurrencyColumns } from "~/components/Markets/Cryptocurrency/columns"
import { trpc } from "~/utils/trpc"

export const Cryptocurrency = () => {
	const { data, error } = trpc.markets.cryptocurrency.useQuery()

	if (error) {
		return (
			<NextError
				title={error.message}
				statusCode={error.data?.httpStatus ?? 500}
			/>
		)
	}

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
