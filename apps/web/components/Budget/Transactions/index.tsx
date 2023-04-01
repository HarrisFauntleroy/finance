import React from "react"

import { transactionsListColumns } from "components/Budget/Transactions/columns"
import { useSession } from "next-auth/react"
import { Table } from "ui"
import { trpc } from "~/utils/trpc"

export const TransactionsList = () => {
	const session = useSession()
	const userId = session?.data?.userId

	const { data } = trpc.budgetTransactions.byUserId.useQuery({
		userId: userId || "",
	})

	return (
		<Table
			id="budgetOverview"
			data={data || []}
			columns={transactionsListColumns}
			getRowCanExpand
			filterEnabled
			paginationEnabled
			renderSubRow={(props) =>
				(props?.row?.original?.subAssets?.length || 0) > 0 && (
					<Table
						id="budgetOverview"
						data={props?.row?.original?.subAssets || []}
						columns={transactionsListColumns}
						getRowCanExpand
						paginationEnabled
					/>
				)
			}
		/>
	)
}
