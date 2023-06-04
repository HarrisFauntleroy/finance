import { Box, Button, TextInput, TextInputProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { logger } from "common";
import { Asset } from "database/generated/prisma-client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { CreateOrUpdateAssetSchema } from "../../../server/trpc/router/assets";
import { trpc } from "../../../utils/trpc";
import { Debug } from "../../Debug";

export const AssetForm = ({ asset }: { asset?: Asset }) => {
  const session = useSession();
  const queryClient = useQueryClient();
  const userId = session?.data?.userId || "";

  const assetNotificationId = "assetNotificationId";
  const mutation = trpc.assets.createOrUpdate.useMutation({
    onError: () => {
      notifications.update({
        id: assetNotificationId,
        title: "Error.",
        message: "Failed to create asset",
      });
    },
    onMutate: (data) => {
      notifications.show({
        id: assetNotificationId,
        title: "Loading...",
        message: data.id ? "Updating asset" : "Creating asset",
        withCloseButton: false,
        autoClose: false,
      });
    },
    onSuccess: () => {
      notifications.update({
        id: assetNotificationId,
        title: "Success",
        message: "Successfully created asset",
        autoClose: 5000,
      });
    },
  });

  async function onValidSubmit(data: CreateOrUpdateAssetSchema) {
    return mutation.mutateAsync(data).then((asset) => {
      queryClient.invalidateQueries();
      notifications.show({
        title: `Successfully created asset ${asset.name}`,
        message: JSON.stringify(asset),
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

  const accountForm = useForm<CreateOrUpdateAssetSchema>({
    defaultValues: asset,
  });

  const inputs: TextInputProps[] = useMemo(
    () => [
      {
        id: "create-asset-userId",
        label: "User Id",
        placeholder: "User Id",
        ...accountForm.register("userId"),
        value: userId,
        hidden: true,
      },
      {
        id: "create-asset-name",
        label: "Name",
        placeholder: "Name",
        ...accountForm.register("name"),
      },
      {
        id: "create-asset-currency",
        label: "Currency",
        placeholder: "Currency",
        ...accountForm.register("currency"),
      },
      {
        id: "create-asset-balance",
        label: "Balance",
        placeholder: "Balance",
        ...accountForm.register("balance"),
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
