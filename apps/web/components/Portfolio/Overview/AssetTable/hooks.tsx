import { useCallback } from 'react';

import { logger } from 'common';
import { Asset } from 'database/generated/prisma-client';

import { trpc } from '~/utils/trpc';

import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export function useAssetActions(
  userId: string | undefined,
): SubmitHandler<FieldValues> {
  const toast = useToast();
  const queryClient = useQueryClient();
  const createAsset = trpc.assets.create.useMutation();
  const updateAsset = trpc.assets.update.useMutation();

  const handleValidSubmit: SubmitHandler<FieldValues> = useCallback(
    (data: Asset) => {
      console.log(data);
      if (userId) {
        if (data?.id) {
          return updateAsset
            .mutateAsync(data)
            .then((asset) => {
              queryClient.invalidateQueries();
              toast({
                title: `Successfully updated account ${asset.name}`,
                status: 'success',
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
              status: 'success',
            });
          })
          .catch(logger.error);
      }
      return new Error('No userId provided');
    },
    [createAsset, queryClient, toast, updateAsset, userId],
  );

  return { handleValidSubmit };
}
