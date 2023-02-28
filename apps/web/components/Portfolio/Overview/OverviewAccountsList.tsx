import React from "react"

import { ControlBar } from "../ControlBar"
import { transactionsListColumns } from "../Transactions/columns"
import { Stack, Text } from "@chakra-ui/react"
import type { AssetWithCalculatedValues } from "common"
import type { AssetTransaction } from "database/generated/prisma-client/index"
import { useSession } from "next-auth/react"
import { Table } from "ui"
import TableSubComponent from "~/components/Portfolio/Overview/TableSubRow"
import { overviewAccountsListColumns } from "~/components/Portfolio/Overview/columns"
import { trpc } from "~/utils/trpc"

const TransactionTable = ({
	transactions,
}: {
	transactions: AssetTransaction[]
}) => {
	return transactions.length > 0 ? (
		<Table
			id="portfolioOverviewAssetTransactions"
			data={transactions || []}
			columns={transactionsListColumns}
			getRowCanExpand
			filterEnabled
			paginationEnabled
		/>
	) : (
		<Text>No Transactions to display</Text>
	)
}

const AssetTable = ({ assets }: { assets?: AssetWithCalculatedValues[] }) => {
	return assets && assets?.length > 0 ? (
		<Table
			id="portfolioOverviewAssets"
			data={assets || []}
			columns={overviewAccountsListColumns}
			getRowCanExpand
			filterEnabled
			paginationEnabled
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			renderSubComponent={(props: any) => {
				const { subAssets, transactions } = props.row.original
				return (
					<Stack>
						<AssetTable assets={subAssets} />
						<TransactionTable transactions={transactions} />
						{/* Optional debug stuff  */}
						<TableSubComponent row={props.row} />
					</Stack>
				)
			}}
		/>
	) : (
		<Text>No Assets to display</Text>
	)
}

export const OverviewAccountsList = () => {
	const session = useSession()
	const userId = session?.data?.userId

	const { data } = trpc.assets.byUserId.useQuery({
		userId: userId || "",
	})

	return (
		<Stack>
			<ControlBar />
			{/* This should take an array of Assets */}
			<AssetTable assets={data} />
		</Stack>
	)
}
