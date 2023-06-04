import { useSession } from "next-auth/react";
import { trpc } from "../../../utils/trpc";
import { Table } from "../../MantineTable";

export const TransactionsList = () => {
  const session = useSession();
  const userId = session?.data?.userId;

  const { data } = trpc.budgetTransactions.byUserId.useQuery({
    userId: userId || "",
  });

  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Account</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
