import type { PortfolioSnapshot } from "@alchemical-finance/database/generated/prisma-client";
import type { ColumnDef } from "@tanstack/react-table";
import Currency from "../Currency";

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
];

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
];

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
];
