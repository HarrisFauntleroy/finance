import React from "react"

import { Text } from "@chakra-ui/react"
import type { ColumnDef } from "@tanstack/react-table"
import currency from "currency.js"
import type { Budget } from "database/generated/prisma-client"

// const UpdateAsset = () => {
// 	const updateAsset = trpc.assets.update.useMutation()

// 	const handleClick = () =>
// 		updateAsset.mutateAsync({

// 		}).then(() => console.log("update"))

// 	return <Button>update</Button>
// }

// const DeleteAsset = () => {
// 	const deleteAsset = trpc.assets.delete.useMutation()

// 	const handleClick = () =>
// 		deleteAsset.mutateAsync({

// 		}).then(() => console.log("delete"))

// 	return <Button>delete</Button>
// }

// const CreateAsset = () => {
// 	const createAsset = trpc.assets.create.useMutation()

// 	const handleClick = () =>
// 		createAsset.mutateAsync({

// 		}).then(() => console.log("create"))

// 	return <Button>create</Button>
// }

/** Column definitions for budget page */
export const budgetColumns: ColumnDef<Budget>[] = [
	{
		header: "Name",
		accessorKey: "name",
		cell: ({
			row: {
				original: { name },
			},
		}) => <Text>{name}</Text>,
	},
	{
		header: "Total balance",
		accessorKey: "totalBalance",
		cell: ({
			row: {
				original: { totalBalance },
			},
		}) => <Text>{currency(String(totalBalance)).format()}</Text>,
	},
]
