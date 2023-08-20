import { Box, Button, TextInput, TextInputProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { logger } from "common";
import { AssetTransaction } from "database/generated/prisma-client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { CreateOrUpdateAsseTransactionSchema } from "../../../server/trpc/router/assetTransaction";
import { trpc } from "../../../utils/trpc";
import { Debug } from "../../Debug";

type TransactionFormProps = {
  transaction?: AssetTransaction;
};

export const TransactionForm = ({ transaction }: TransactionFormProps) => {
  const session = useSession();
  const queryClient = useQueryClient();
  const userId = session?.data?.userId || "";

  const transactionNotificationId = "transactionNotificationId";
  const mutation = trpc.assetTransactions.createOrUpdate.useMutation({
    onError: () => {
      notifications.update({
        id: transactionNotificationId,
        title: "Error.",
        message: "Failed to create transaction",
      });
    },
    onMutate: (data) => {
      notifications.show({
        id: transactionNotificationId,
        title: "Loading...",
        message: data.id ? "Updating transaction" : "Creating transaction",
        withCloseButton: false,
        autoClose: false,
      });
    },
    onSuccess: () => {
      notifications.update({
        id: transactionNotificationId,
        title: "Success",
        message: "Successfully created transaction",
        autoClose: 5000,
      });
    },
  });

  async function onValidSubmit(data: CreateOrUpdateAsseTransactionSchema) {
    return mutation.mutateAsync(data).then((transaction) => {
      queryClient.invalidateQueries();
      return notifications.show({
        title: `Successfully created transaction ${transaction.id}`,
        message: JSON.stringify(transaction),
      });
    });
  }

  async function onInvalidSubmit() {
    logger.error(`Error submitting form: ${accountForm.formState.errors}`);
    notifications.show({
      title: "Error",
      message: "Invalid form data",
    });
  }

  const accountForm = useForm<CreateOrUpdateAsseTransactionSchema>({
    defaultValues: transaction,
  });

  // id: z.string().optional(),
  // userId: z.string(),
  // assetId: z.string(),
  // baseCurrency: z.string(),
  // quantity: z.string(),
  // toAsset: z.string(),
  // transactionType: z.string(),

  const inputs: TextInputProps[] = useMemo(
    () => [
      {
        id: "create-transaction-userId",
        label: "User Id",
        placeholder: "User Id",
        ...accountForm.register("userId"),
        value: userId,
        hidden: true,
      },
      {
        id: "create-transaction-baseCurrency",
        label: "Base Currency",
        placeholder: "Base Currency",
        ...accountForm.register("baseCurrency"),
      },
      {
        id: "create-transaction-quantity",
        label: "Quantity",
        placeholder: "Quantity",
        ...accountForm.register("quantity"),
      },
      {
        id: "create-transaction-toAsset",
        label: "To Asset",
        placeholder: "To Asset",
        ...accountForm.register("toAsset"),
      },
      {
        id: "create-transaction-transactionType",
        label: "Transaction Type",
        placeholder: "Transaction Type",
        ...accountForm.register("transactionType"),
      },
    ],
    [accountForm, userId]
  );

  return (
    <Box>
      <form onSubmit={accountForm.handleSubmit(onValidSubmit, onInvalidSubmit)}>
        {inputs?.map((values) => (
          <TextInput
            key={values.id}
            display={values.hidden ? "none" : ""}
            {...values}
          />
        ))}
        <Button mt="8px" type="submit">
          Submit
        </Button>
      </form>
      <Debug data={accountForm.formState} />
    </Box>
  );
};
