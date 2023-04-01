import React, { useCallback } from "react"

import { createColumnHelper } from "@tanstack/table-core"
import {
	AccountConnection,
	Asset,
	AssetStatus,
	Category,
} from "database/generated/prisma-client"
import { Table } from "ui"

const data: Asset[] = [
	{
		id: "1",
		name: "Asset 1",
		currency: "USD",
		institution: "",
		apiKey: "",
		apiSecret: "",
		walletAddress: "",
		balance: "",
		costBasis: "",
		realisedGain: "",
		targetBalance: "",
		interestBearingBalance: "",
		incomeRate: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		deleted: false,
		deletedAt: new Date(),
		account: AccountConnection.NONE,
		category: Category.CASH,
		categoryId: "",
		marketId: "",
		parentId: "",
		userId: "",
		status: AssetStatus.ACTIVE,
	},
	{
		id: "2",
		name: "Asset 2",
		currency: "EUR",
		institution: "",
		apiKey: "",
		apiSecret: "",
		walletAddress: "",
		balance: "",
		costBasis: "",
		realisedGain: "",
		targetBalance: "",
		interestBearingBalance: "",
		incomeRate: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		deleted: false,
		deletedAt: new Date(),
		account: AccountConnection.NONE,
		category: Category.CASH,
		categoryId: "",
		marketId: "",
		parentId: "",
		userId: "",
		status: AssetStatus.ACTIVE,
	},
]

export function AssetTable() {
	const handleValidSubmit = useCallback((asset: Asset) => {
		console.log("Asset submitted: ", asset)
	}, [])

	const columnHelper = createColumnHelper<Asset>()

	const columns = [
		columnHelper.accessor("id", {
			header: "ID",
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor("name", {
			header: "Name",
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor("currency", {
			header: "Currency",
			cell: (info) => info.getValue(),
		}),
	]

	return (
		<Table
			id="editableTable"
			columns={columns}
			data={data}
			filterEnabled={false}
			paginationEnabled={false}
			onValidSubmit={handleValidSubmit}
		/>
	)
}
