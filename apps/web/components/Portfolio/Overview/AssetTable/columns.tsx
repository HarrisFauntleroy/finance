import { AssetWithCalculatedValues } from "@alchemical-finance/common";
import { AccountConnection } from "@alchemical-finance/database/generated/prisma-client";

import { CopyContent } from "../../../lol/CopyContent";

import { createColumnHelper } from "@tanstack/table-core";

const columnHelper = createColumnHelper<AssetWithCalculatedValues>();

export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("institution", {
    header: "Institution",
    cell: ({ getValue }) => getValue() || "N/A",
  }),
  columnHelper.accessor("currency", {
    header: "Currency",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("apiKey", {
    header: "API Key",
    cell: ({ getValue }) => <CopyContent content={getValue()} /> || "N/A",
  }),
  columnHelper.accessor("apiSecret", {
    header: "API Secret",
    cell: ({ getValue }) => <CopyContent content={getValue()} /> || "N/A",
  }),
  columnHelper.accessor("walletAddress", {
    header: "Wallet Address",
    cell: ({ getValue }) => <CopyContent content={getValue()} /> || "N/A",
  }),
  columnHelper.accessor("balance", {
    header: "Balance",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("costBasis", {
    header: "Cost Basis",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("realisedGain", {
    header: "Realised Gains",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("targetBalance", {
    header: "Target Balance",
    cell: ({ getValue }) => getValue() || "N/A",
  }),
  columnHelper.accessor("interestBearingBalance", {
    header: "Interest Bearing Balance",
    cell: ({ getValue }) => getValue() || "N/A",
  }),
  columnHelper.accessor("incomeRate", {
    header: "Income Rate",
    cell: ({ getValue }) => getValue() || "N/A",
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: ({ getValue }) => getValue().toLocaleDateString(),
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated At",
    cell: ({ getValue }) => getValue().toLocaleDateString(),
  }),
  columnHelper.accessor("deleted", {
    header: "Deleted",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  }),
  columnHelper.accessor("deletedAt", {
    header: "Deleted At",
    cell: ({ getValue }) => getValue()?.toLocaleDateString() || "N/A",
  }),
  columnHelper.accessor("account", {
    header: "Account Connection",
    cell: ({ getValue }) => getValue() || AccountConnection.NONE,
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: ({ getValue }) => getValue() || "N/A",
  }),
  columnHelper.accessor("categoryId", {
    header: "Category ID",
    cell: ({ getValue }) => getValue() || "N/A",
  }),
  columnHelper.accessor("marketId", {
    header: "Market ID",
    cell: ({ getValue }) => getValue() || "N/A",
  }),
  columnHelper.accessor("parentId", {
    header: "Parent ID",
    cell: ({ getValue }) => getValue() || "N/A",
  }),
  columnHelper.accessor("userId", {
    header: "User ID",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => getValue() || "N/A",
  }),
];
