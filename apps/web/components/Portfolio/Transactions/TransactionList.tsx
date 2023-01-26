import React from "react"

import { Stack } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { Table } from "ui"
import { transactionsListColumns } from "~/components/Portfolio/Transactions/columns"
import { trpc } from "~/utils/trpc"
import TableSubComponent from "~/components/Cryptocurrency/SubRow"

export const TransactionsList = () => {
	const session = useSession()
	const userId = session?.data?.userId

	const { data } = trpc.assetTransactions.byUserId.useQuery({
		userId: userId || "",
	})

	return (
		<Table
			id="assetOverview"
			data={data || []}
			columns={transactionsListColumns}
			getRowCanExpand
			filterEnabled
			paginationEnabled
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			renderSubComponent={(props: any) =>
				(props?.row?.original?.Children?.length || 0) > 0 ? (
					<Stack>
						<Table
							id="assetOverview"
							data={props?.row?.original?.Children || []}
							columns={transactionsListColumns}
							getRowCanExpand
							renderSubComponent={TableSubComponent}
							paginationEnabled
						/>
						<TableSubComponent row={props.row} />
					</Stack>
				) : (
					<TableSubComponent row={props.row} />
				)
			}
		/>
	)
}
