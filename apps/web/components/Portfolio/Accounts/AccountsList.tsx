import React from "react"

import { Stack } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { Table } from "ui"
import TableSubComponent from "~/components/Cryptocurrency/SubRow"
import { portfolioOverviewColumns } from "~/components/Portfolio/Accounts/columns"
import type { RouterOutput } from "~/utils/trpc"
import { trpc } from "~/utils/trpc"

export type AssetsByUserIdQueryOutput = RouterOutput["assets"]["byUserId"]

export const AccountsList = () => {
	const session = useSession()
	const userId = session?.data?.userId

	const { data } = trpc.assets.byUserId.useQuery({
		userId: userId || "",
	})

	return (
		<Table
			id="cryptocurrencyOverview"
			data={data || []}
			columns={portfolioOverviewColumns}
			getRowCanExpand
			filterEnabled
			paginationEnabled
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			renderSubComponent={(props: any) => (
				<Stack>
					{(props?.row?.original?.Children?.length || 0) > 0 && (
						<Table
							id="cryptocurrencyOverview"
							data={props?.row?.original?.Children || []}
							columns={portfolioOverviewColumns}
							getRowCanExpand
							renderSubComponent={TableSubComponent}
							paginationEnabled
						/>
					)}
					<TableSubComponent row={props.row} />
				</Stack>
			)}
		/>
	)
}
