import {
  Avatar,
  Box,
  Group,
  Navbar as MantineNavbar,
  rem,
  UnstyledButton,
  Text,
  useMantineTheme,
} from '@mantine/core';

import { SignIn, SignOut } from '@phosphor-icons/react';

import { signIn, signOut, useSession } from 'next-auth/react';
import { MainLink } from './MainLink';
import { type LinkType } from './Header';

const Navbar = ({ links }: { links: LinkType[] }) => {
  const theme = useMantineTheme();
  const { data: session } = useSession();

  return (
    <MantineNavbar
      width={{ base: 0, sm: 300 }}
      p="xs"
      hiddenBreakpoint="sm"
      hidden
    >
      <MantineNavbar.Section grow mt="xs">
        <div>
          {links.map((link) => (
            <MainLink {...link} key={link.label} />
          ))}
        </div>
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <Box
          sx={{
            paddingTop: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${
              theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
          }}
        >
          <UnstyledButton
            sx={{
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            }}
          >
            {session ? (
              <Group onClick={() => signOut()}>
                <Avatar src={session?.user.image} radius="xl" />
                <Box sx={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    {session?.user.name}
                  </Text>
                  <Text color="dimmed" size="xs">
                    {session?.user.email}
                  </Text>
                </Box>
                <SignOut />
              </Group>
            ) : (
              <Group onClick={() => signIn()}>
                <Avatar radius="xl" />
                <Box sx={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    Sign in
                  </Text>
                  <Text color="dimmed" size="xs">
                    Or sign up!
                  </Text>
                </Box>

                <SignIn />
              </Group>
            )}
          </UnstyledButton>
        </Box>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
