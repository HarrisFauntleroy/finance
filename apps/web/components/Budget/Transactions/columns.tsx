import { BudgetTransaction } from "database/generated/prisma-client";

import { List, ListItem, Text } from "@chakra-ui/react";
import type { ColumnDef } from "@tanstack/react-table";
import Currency from "components/Currency";

export const transactionsListColumns: ColumnDef<BudgetTransaction>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({
      row: {
        original: { id },
      },
    }) => {
      return <Text>{id}</Text>;
    },
  },
  {
    header: "Timestamp",
    accessorKey: "timestamp",
    cell: ({
      row: {
        original: { timestamp },
      },
    }) => {
      return <Text>{timestamp?.toISOString()}</Text>;
    },
  },
  {
    header: "Price Per Unit",
    accessorKey: "pricePerUnit",
    cell: ({
      row: {
        original: { pricePerUnit },
      },
    }) => {
      return <Currency value={pricePerUnit} />;
    },
  },
  {
    header: "Base Currency",
    accessorKey: "baseCurrency",
    cell: ({
      row: {
        original: { baseCurrency },
      },
    }) => {
      return <Text>{baseCurrency}</Text>;
    },
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
    cell: ({
      row: {
        original: { quantity },
      },
    }) => {
      return <Text>{quantity?.toString()}</Text>;
    },
  },
  {
    header: "Quantity Filled",
    accessorKey: "quantityFilled",
    cell: ({
      row: {
        original: { quantityFilled },
      },
    }) => {
      return <Text>{quantityFilled?.toString()}</Text>;
    },
  },
  {
    header: "Fee",
    accessorKey: "fee",
    cell: ({
      row: {
        original: { fee },
      },
    }) => {
      return <Currency value={fee} />;
    },
  },
  {
    header: "Value In Base Currency",
    accessorKey: "valueInBaseCurrency",
    cell: ({
      row: {
        original: { valueInBaseCurrency },
      },
    }) => {
      return <Currency value={valueInBaseCurrency} />;
    },
  },
  {
    header: "From Asset",
    accessorKey: "fromAsset",
    cell: ({
      row: {
        original: { fromAsset },
      },
    }) => {
      return <Text>{fromAsset}</Text>;
    },
  },
  {
    header: "To Asset",
    accessorKey: "toAsset",
    cell: ({
      row: {
        original: { toAsset },
      },
    }) => {
      return <Text>{toAsset}</Text>;
    },
  },
  {
    header: "Market",
    accessorKey: "market",
    cell: ({
      row: {
        original: { market },
      },
    }) => {
      return (
        <List>
          {market &&
            Object.entries(market).map(([key, value]) => (
              <ListItem key={key + value}>{`${key} ${value}`}</ListItem>
            ))}
        </List>
      );
    },
  },
  {
    header: "Tx Type",
    accessorKey: "transactionType",
    cell: ({
      row: {
        original: { transactionType },
      },
    }) => {
      return <Text>{transactionType}</Text>;
    },
  },
  {
    header: "Expiry",
    accessorKey: "expiry",
    cell: ({
      row: {
        original: { expiry },
      },
    }) => {
      return <Text>{expiry?.toISOString()}</Text>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({
      row: {
        original: { status },
      },
    }) => {
      return <Text>{status}</Text>;
    },
  },
  {
    header: "Tx Hash",
    accessorKey: "transactionHash",
    cell: ({
      row: {
        original: { transactionHash },
      },
    }) => {
      return <Text>{transactionHash}</Text>;
    },
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({
      row: {
        original: { description },
      },
    }) => {
      return <Text>{description}</Text>;
    },
  },
  {
    header: "Memo",
    accessorKey: "memo",
    cell: ({
      row: {
        original: { memo },
      },
    }) => {
      return <Text>{memo}</Text>;
    },
  },
];
