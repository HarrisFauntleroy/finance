import { useSession } from "next-auth/react";
import { trpc } from "../../../utils/trpc";
import { Table } from "../../MantineTable";

export const TransactionsList = () => {
  const session = useSession();
  const userId = session?.data?.userId;

  const { data } = trpc.assetTransactions.byUserId.useQuery({
    userId: userId || "",
  });

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Timestamp</th>
          <th>Price Per Unit</th>
          <th>Base Currency</th>
          <th>Quantity</th>
          <th>Quantity Filled</th>
          <th>Fee</th>
          <th>Fee Currency</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.timestamp?.toISOString()}</td>
            <td>{transaction.pricePerUnit}</td>
            <td>{transaction.baseCurrency}</td>
            <td>{transaction.quantity}</td>
            <td>{transaction.quantityFilled}</td>
            <td>{transaction.fee}</td>
            {/* <td>{transaction.feeCurrency}</td> */}
            {/* <td>{transaction.notes}</td> */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
