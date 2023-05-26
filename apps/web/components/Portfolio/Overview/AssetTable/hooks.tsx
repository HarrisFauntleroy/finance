import { logger } from "@alchemical-finance/common";

import { trpc } from "../../../../utils/trpc";

import { type Asset } from "@alchemical-finance/database/generated/prisma-client";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";

export function useAssetActions(userId: string | undefined): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleValidSubmit: SubmitHandler<any>;
} {
  const toast = useToast();
  const queryClient = useQueryClient();
  const createAsset = trpc.assets.create.useMutation();
  const updateAsset = trpc.assets.update.useMutation();

  const handleValidSubmit: SubmitHandler<Asset> = (data) => {
    if (userId) {
      if (data?.id) {
        return updateAsset
          .mutateAsync(data)
          .then((asset) => {
            queryClient.invalidateQueries();
            toast({
              title: `Successfully updated account ${asset.name}`,
              status: "success",
            });
          })
          .catch(logger.error);
      }
      return createAsset
        .mutateAsync(data)
        .then(({ name }) => {
          queryClient.invalidateQueries();
          toast({
            title: `Successfully created account ${name}`,
            status: "success",
          });
        })
        .catch(logger.error);
    }
    return new Error("No userId provided");
  };

  return { handleValidSubmit };
}
