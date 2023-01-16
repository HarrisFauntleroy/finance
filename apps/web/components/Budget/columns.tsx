import type { ColumnDef } from "@tanstack/react-table"
import type { Budget } from "database/generated/prisma-client"
import { BudgetForm } from "~/components/Budget/Form"

/** Column definitions for budget page */
export const budgetColumns: ColumnDef<Budget>[] = [
	{
		header: "Name",
		accessorKey: "name",
		cell: ({
			row: {
				original: { name },
			},
		}) => <div>{name}</div>,
	},
	{
		header: "Update",
		cell: ({ row: { original } }) => (
			<BudgetForm mode="edit" defaultValues={original} />
		),
	},
]
