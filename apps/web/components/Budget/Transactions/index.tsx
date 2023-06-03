import { useSession } from "next-auth/react";
import { trpc } from "../../../utils/trpc";
import { transactionsListColumns } from "../../Budget/Transactions/columns";
import { Table } from "../../Table";

export const TransactionsList = () => {
  const session = useSession();
  const userId = session?.data?.userId;

  const { data } = trpc.budgetTransactions.byUserId.useQuery({
    userId: userId || "",
  });

  return (
    <Table
      id="budgetOverview"
      data={data || []}
      columns={transactionsListColumns}
      canExpandRows
      filterEnabled
      paginationEnabled
    />
  );
};
