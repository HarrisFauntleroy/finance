import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { AssetTransaction } from "database/generated/prisma-client";
import { TransactionForm } from "./TransactionForm";

type UpdateTransactionProperties = {
  transaction: AssetTransaction;
};

export const UpdateTransaction = ({
  transaction,
}: UpdateTransactionProperties) => {
  const openUpdateTransactionModal = () => {
    modals.open({
      id: "update-transaction",
      title: "Update transaction",
      centered: true,
      children: <TransactionForm transaction={transaction} />,
    });
  };

  return (
    <Button color="green" onClick={openUpdateTransactionModal}>
      Edit
    </Button>
  );
};
