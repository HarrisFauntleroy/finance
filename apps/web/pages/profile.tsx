/**
 *
 * Profile page
 *
 */
import React from 'react';

import { Body, Page } from 'ui';

import { trpc } from '~/utils/trpc';

import { Button } from '@chakra-ui/react';
import { SettingsForm } from 'components/Settings/Form';
import { useSession } from 'next-auth/react';

const Profile = () => {
  /** Session from next-auth */
  const session = useSession();
  /** userId */
  const userId = session.data?.userId;

  const { data: defaultValues } = trpc.settings.byUserId.useQuery({
    userId: userId || '',
  });

  const deleteSettings = trpc.settings.delete.useMutation();

  return (
    <Page title="Profile">
      <Body>
        <SettingsForm defaultValues={defaultValues} />
        {defaultValues?.id && (
          <Button
            onClick={() =>
              deleteSettings.mutateAsync({
                id: defaultValues.id,
              })
            }
          >
            Delete settings
          </Button>
        )}
      </Body>
    </Page>
  );
};

Profile.auth = true;
export default Profile;
