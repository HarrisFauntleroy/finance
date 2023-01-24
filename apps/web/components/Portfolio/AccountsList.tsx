import React from "react"

import { Stack } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { Table } from "ui"
import TableSubComponent from "~/components/Cryptocurrency/SubRow"
import { assetColumns } from "~/components/Portfolio/Asset/columns"
import { trpc } from "~/utils/trpc"

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
			columns={assetColumns}
			getRowCanExpand
			filterEnabled
			paginationEnabled
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			renderSubComponent={(props: any) =>
				(props?.row?.original?.Children?.length || 0) > 0 ? (
					<Stack>
						<Table
							id="cryptocurrencyOverview"
							data={props?.row?.original?.Children || []}
							columns={assetColumns}
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
