import type { ColumnDef } from "@tanstack/react-table"
import type { PortfolioSnapshot } from "database/generated/prisma-client"
import Currency from "~/components/Currency"

/** Column definitions for crypto page */
export const incomeBreakdownColumns: ColumnDef<PortfolioSnapshot>[] = [
	{
		header: "Date Recorded",
		accessorKey: "createdAt",
		cell: ({ row }) => row.original?.createdAt?.toDateString(),
	},
	{
		header: "Net Worth",
		accessorKey: "totalValue",
		cell: ({ row }) => <Currency value={row.original.totalValue} />,
	},
]

/** Column definitions for crypto page */
export const historySnapshotColumns: ColumnDef<PortfolioSnapshot>[] = [
	{
		header: "Date Recorded",
		accessorKey: "createdAt",
		cell: ({ row }) => row.original?.createdAt?.toDateString(),
	},
	{
		header: "Net Worth",
		accessorKey: "totalValue",
		cell: ({ row }) => <Currency value={row.original.totalValue} />,
	},
]

/** Column definitions for crypto page */
export const overViewColumns: ColumnDef<PortfolioSnapshot>[] = [
	{
		header: "Net Worth",
		accessorKey: "createdAt",
		cell: ({ row }) => row.original?.createdAt?.toDateString(),
	},
	{
		header: "Net Worth",
		accessorKey: "totalValue",
		cell: ({ row }) => <Currency value={row.original.totalValue} />,
	},
]