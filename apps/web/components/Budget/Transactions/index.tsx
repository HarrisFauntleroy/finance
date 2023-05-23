import { Table } from "../../Table";

import { trpc } from "../../../utils/trpc";

import { useSession } from "next-auth/react";
import { transactionsListColumns } from "../../Budget/Transactions/columns";

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
