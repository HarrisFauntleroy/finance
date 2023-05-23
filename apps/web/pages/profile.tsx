/**
 *
 * Profile page
 *
 */

import { trpc } from '../utils/trpc';

import { Button } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { SettingsForm } from '../components/Settings/Form';
import { Page } from '../components/Layout/Page';

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
    </Page>
  );
};

Profile.auth = true;
export default Profile;
