import { Text } from "@mantine/core";
import { AssetTransaction } from "database/generated/prisma-client";
import { Table } from "../../../Table";
import { transactionsListColumns } from "../../Transactions/columns";

export const TransactionTable = ({
  transactions,
}: {
  transactions: AssetTransaction[];
}) => {
  return transactions.length > 0 ? (
    <Table
      id="portfolioOverviewAssetTransactions"
      data={transactions || []}
      columns={transactionsListColumns}
      canExpandRows
      filterEnabled
      paginationEnabled
    />
  ) : (
    <Text>No Transactions to display</Text>
  );
};
