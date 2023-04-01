import React from "react"

import { logger } from "common"
import { portfolioOverviewColumns } from "components/Portfolio/Accounts/columns"
import { useSession } from "next-auth/react"
import { Table } from "ui"
import { type RouterOutput, trpc } from "~/utils/trpc"

export type AssetsByUserIdQueryOutput = RouterOutput["assets"]["byUserId"]

export const AccountsList = () => {
	const session = useSession()
	const userId = session?.data?.userId

	const { data } = trpc.assets.byUserId.useQuery({
		userId: userId || "",
	})

	logger.debug("data", data)

	return (
		<Table
			id="cryptocurrencyOverview"
			data={data || []}
			columns={portfolioOverviewColumns}
			getRowCanExpand
			filterEnabled
			paginationEnabled
			renderSubRow={(props) =>
				(props?.row?.original?.Children?.length || 0) > 0 && (
					<Table
						id="cryptocurrencyOverview"
						data={props?.row?.original?.Children}
						columns={portfolioOverviewColumns}
						getRowCanExpand
						paginationEnabled
					/>
				)
			}
		/>
	)
}
