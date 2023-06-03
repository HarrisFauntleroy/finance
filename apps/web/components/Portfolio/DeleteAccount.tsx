import { Button, Center, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { TrashSimple } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { logger } from "common";
import { Asset } from "database/generated/prisma-client";
import { trpc } from "../../utils/trpc";

type DeleteAccountProps = {
  asset: Asset;
};

export const DeleteAccount = ({ asset }: DeleteAccountProps) => {
  const queryClient = useQueryClient();

  const assetNotificationId = "assetNotificationId";

  function onSettled() {
    logger.info("Finished deleting asset");
    notifications.update({
      id: assetNotificationId,
      title: "Settled",
      message: "Successfully deleted asset",
      autoClose: 5000,
    });
  }

  function onSuccess() {
    queryClient.invalidateQueries();
    notifications.update({
      id: assetNotificationId,
      title: "Success",
      message: "Successfully deleted asset",
      autoClose: 5000,
    });
    close();
  }

  function onMutate() {
    logger.info("Deleting asset");
    notifications.show({
      id: assetNotificationId,
      title: "Mutate",
      message: <Loader />,
      autoClose: false,
    });
  }

  function onError() {
    logger.error("Error deleting asset");
    notifications.update({
      id: assetNotificationId,
      title: "Error",
      message: "Failed to delete asset",
      autoClose: 5000,
    });
  }

  const mutation = trpc.assets.delete.useMutation({
    onSettled,
    onSuccess,
    onMutate,
    onError,
  });

  const handleDelete = () => {
    mutation.mutateAsync({ id: asset.id });
  };

  return (
    <Button
      color="red"
      onClick={() => {
        modals.open({
          id: "create-asset",
          withCloseButton: false,
          children: (
            <Center>
              <Button.Group>
                <Button
                  id={`delete-asset-button-${asset.id}`}
                  onClick={handleDelete}
                  loading={mutation.isLoading}
                  leftIcon={<TrashSimple />}
                  color="red"
                >
                  Delete {asset.name}
                </Button>
                <Button onClick={close}>Cancel</Button>
              </Button.Group>
            </Center>
          ),
        });
      }}
    >
      Delete
    </Button>
  );
};
