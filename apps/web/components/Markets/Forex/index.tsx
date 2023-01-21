import React from "react"

import { forexColumns } from "./columns"
import { Stack } from "@chakra-ui/react"
import NextError from "next/error"
import { Table } from "ui"
import { trpc } from "~/utils/trpc"

export const Forex = () => {
	const { data, error } = trpc.markets.forex.useQuery()
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
				id="Forex"
				data={data || []}
				columns={forexColumns}
				getRowCanExpand
				paginationEnabled
			/>
		</Stack>
	)
}
