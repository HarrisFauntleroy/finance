import React from "react"

import { ControlBar } from "../ControlBar"
import { transactionsListColumns } from "../Transactions/columns"
import { Stack, Text } from "@chakra-ui/react"
import type { AssetSummaryOutput } from "common"
import type { AssetTransaction } from "database/generated/prisma-client/index"
import { useSession } from "next-auth/react"
import { Table } from "ui"
import TableSubComponent from "~/components/Portfolio/Overview/TableSubRow"
import { overviewAccountsListColumns } from "~/components/Portfolio/Overview/columns"
import { trpc } from "~/utils/trpc"

const TransactionTable = ({ data }: { data: AssetTransaction[] }) => {
	return data.length > 0 ? (
		<Table
			id="portfolioOverviewAssetTransactions"
			data={data || []}
			columns={transactionsListColumns}
			getRowCanExpand
			filterEnabled
			paginationEnabled
		/>
	) : (
		<Text>No Transactions to display</Text>
	)
}

/** This will show assets, optionally sub assets, and transactions for both */
const AssetTable = ({ data }: { data?: AssetSummaryOutput[] }) => {
	return data && data?.length > 0 ? (
		<Table
			id="portfolioOverviewAssets"
			data={data || []}
			columns={overviewAccountsListColumns}
			getRowCanExpand
			filterEnabled
			paginationEnabled
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			renderSubComponent={(props: any) => {
				const { subAssets, transactions } = props.row.original
				return (
					<Stack>
						<AssetTable data={subAssets} />
						<TransactionTable data={transactions} />
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
			<AssetTable data={data} />
		</Stack>
	)
}
