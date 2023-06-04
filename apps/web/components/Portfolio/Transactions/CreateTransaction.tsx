import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { TransactionForm } from "./TransactionForm";

export const CreateTransaction = () => {
  const openUpdateTransactionModal = () => {
    modals.open({
      id: "create-transaction",
      title: "Create transaction",
      centered: true,
      children: <TransactionForm />,
    });
  };

  return (
    <Button color="green" onClick={openUpdateTransactionModal}>
      Create
    </Button>
  );
};
