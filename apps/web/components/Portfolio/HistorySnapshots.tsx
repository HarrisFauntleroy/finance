import React from "react"

import { historySnapshotColumns } from "./columns"
import { Skeleton, Text } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { Card, Table } from "ui"
import { trpc } from "~/utils/trpc"

export const HistorySnapshots = () => {
	const session = useSession()
	const userId = session?.data?.userId

	const { data: historyData } = trpc.accounts.historyByUserId.useQuery({
		userId: userId || "",
	})

	/** Make a copy of the data to allow mutation/reversal */
	const tableData =
		historyData?.portfolioSnapshot && Array.from(historyData?.portfolioSnapshot)

	return (
		<Card>
			<Text
				variant="h3"
				fontSize={{ base: "lg", sm: "2xl" }}
				fontWeight="bold"
				lineHeight="1.2"
			>
				History Snapshots
			</Text>
			<Skeleton rounded="xl" isLoaded={!!tableData}>
				<Table
					pageSize={4}
					columns={historySnapshotColumns}
					id={"history-portfolioSnapshot"}
					// ISO8601See General principles was designed for lexicographical sort. As such the ISO8601 string representation can be sorted like any other string, and this will give the expected order
					// https://stackoverflow.com/questions/12192491/sort-array-by-iso-8601-date
					// This only works if the date includes the timezone
					data={
						tableData
							?.sort(function (a, b) {
								return a.createdAt < b.createdAt
									? -1
									: a.createdAt > b.createdAt
									? 1
									: 0
							})
							.reverse() || []
					}
				/>
			</Skeleton>
		</Card>
	)
}
