import type { Budget } from "@alchemical-finance/database/generated/prisma-client";
import { Text } from "@chakra-ui/react";
import type { ColumnDef } from "@tanstack/react-table";
import currency from "currency.js";

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
];
