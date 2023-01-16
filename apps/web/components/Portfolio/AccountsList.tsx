import React from "react"

import { Stack } from "@chakra-ui/react"
import type { CalculatedCryptocurrency } from "common"
import { useSession } from "next-auth/react"
import { Card, Table } from "ui"
import TableSubComponent from "~/components/Cryptocurrency/SubRow"
import { cryptoColumns } from "~/components/Cryptocurrency/columns"
import { trpc } from "~/utils/trpc"
import { ControlBar } from "./ControlBar"

export const AccountsList = () => {
	const session = useSession()
	const userId = session?.data?.userId

	const { data } = trpc.cryptocurrency.byUserId.useQuery({
		userId: userId || "",
	})

	return (
		<Stack>
			<Card>
				<ControlBar />
			</Card>
			<Card>
				<Table
					id="cryptocurrencyOverview"
					data={(data as CalculatedCryptocurrency[]) || []}
					columns={cryptoColumns}
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
									columns={cryptoColumns}
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
			</Card>
		</Stack>
	)
}
