import { useSession } from "next-auth/react";
import { trpc } from "../../../utils/trpc";
import { transactionsListColumns } from "../..//Portfolio/Transactions/columns";
import { Table } from "../../Table";

export const TransactionsList = () => {
  const session = useSession();
  const userId = session?.data?.userId;

  const { data } = trpc.assetTransactions.byUserId.useQuery({
    userId: userId || "",
  });

  return (
    <Table
      id="assetOverview"
      data={data || []}
      columns={transactionsListColumns}
      canExpandRows
      filterEnabled
      paginationEnabled
    />
  );
};
