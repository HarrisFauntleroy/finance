import { trpc } from "../../utils/trpc";

import { DeleteIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

type DeleteAccountProps = {
  id?: string;
};

export const DeleteAccount = ({ id }: DeleteAccountProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const deleteAccount = trpc.assets.delete.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return (
    <Button
      colorScheme="red"
      onClick={() => {
        if (id) {
          return deleteAccount.mutateAsync({ id });
        }
        return toast({
          title: "No assets found, missing ID",
          status: "error",
        });
      }}
    >
      <DeleteIcon />
    </Button>
  );
};
