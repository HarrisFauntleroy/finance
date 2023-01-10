import { createColumnHelper } from "@tanstack/react-table"
import type { Budget } from "database/generated/prisma-client"
import { BudgetForm } from "~/components/Budget/Form"

const columnHelper = createColumnHelper<Budget>()

export const budgetColumns = [
	columnHelper.accessor("id", {
		id: "id",
		header: () => "ID",
	}),
	columnHelper.accessor("updatedAt", {
		id: "update",
		header: () => "Update",
		cell: (info) => (
			<BudgetForm mode="edit" defaultValues={info.row.original} />
		),
	}),
]
