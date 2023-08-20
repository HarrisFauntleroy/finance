import { Text } from "@mantine/core";
import { AssetTransaction } from "database/generated/prisma-client";
import { Table } from "../../../MantineTable";

type TransactionTableProps = {
  transactions: AssetTransaction[];
};

export const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>
              <Text>{transaction.id}</Text>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
