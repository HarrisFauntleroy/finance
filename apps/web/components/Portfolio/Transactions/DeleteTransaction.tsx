import { Button, Loader, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { logger } from "common";
import { AssetTransaction } from "database/generated/prisma-client";
import { trpc } from "../../../utils/trpc";

type DeleteTransactionProps = {
  transaction: AssetTransaction;
};

export const DeleteTransaction = ({ transaction }: DeleteTransactionProps) => {
  const queryClient = useQueryClient();

  const transactionNotificationId = "transactionNotificationId";

  function onSettled() {
    logger.info("Finished deleting transaction");
    notifications.update({
      id: transactionNotificationId,
      title: "Settled",
      message: "Successfully deleted transaction",
      autoClose: 5000,
    });
  }

  function onSuccess() {
    queryClient.invalidateQueries();
    notifications.update({
      id: transactionNotificationId,
      title: "Success",
      message: "Successfully deleted transaction",
      autoClose: 5000,
    });
    close();
  }

  function onMutate() {
    logger.info("Deleting transaction");
    notifications.show({
      id: transactionNotificationId,
      title: "Mutate",
      message: <Loader />,
      autoClose: false,
    });
  }

  function onError() {
    logger.error("Error deleting transaction");
    notifications.update({
      id: transactionNotificationId,
      title: "Error",
      message: "Failed to delete transaction",
      autoClose: 5000,
    });
  }

  const mutation = trpc.assetTransactions.delete.useMutation({
    onSettled,
    onSuccess,
    onMutate,
    onError,
  });

  const handleDelete = () => {
    mutation.mutateAsync({ id: transaction.id });
  };

  const openDeleteMdoal = () => {
    modals.openConfirmModal({
      title: "Delete account",
      centered: true,
      children: (
        <Text size="sm">
          Confirm that you want to delete the account {transaction.id}
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: handleDelete,
    });
  };

  return (
    <Button color="red" onClick={openDeleteMdoal}>
      Delete
    </Button>
  );
};
