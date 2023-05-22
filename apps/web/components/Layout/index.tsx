import {
  AppShell,
  Avatar,
  Box,
  Group,
  Navbar,
  rem,
  useMantineTheme,
  ThemeIcon,
  UnstyledButton,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PropsWithChildren, ReactNode } from 'react';

import {
  Gear,
  Bank,
  PiggyBank,
  ChartLineUp,
  Shield,
  SignIn,
  SignOut,
} from '@phosphor-icons/react';

import Header from '../Layout/Header';
import { Role } from 'database/generated/prisma-client';
import { signIn, signOut, useSession } from 'next-auth/react';

interface MainLinkProps {
  icon: ReactNode;
  color: string;
  label: string;
}

function MainLink({ icon, color, label }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

export function Layout<T>({ children }: PropsWithChildren<T>) {
  const disclosure = useDisclosure();
  const theme = useMantineTheme();
  const { data: session } = useSession();

  const headerLinks = [
    { href: '/portfolio', label: 'Accounts', icon: <Bank />, color: 'grape' },
    {
      href: '/budgets',
      label: 'Budgets',
      icon: <PiggyBank />,
      color: 'teal',
    },
    {
      href: '/markets',
      icon: <ChartLineUp />,
      label: 'Markets',
      color: 'grape',
    },
    {
      href: '/admin',
      icon: <Shield />,
      label: 'Admin',
      role: Role.ADMIN,
      color: 'blue',
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: <Gear />,
      color: 'red',
    },
  ];

  const links = headerLinks.map((link) => (
    <MainLink {...link} key={link.label} />
  ));

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs" hiddenBreakpoint="sm" hidden>
          <Navbar.Section grow mt="xs">
            <div>{links}</div>
          </Navbar.Section>
          <Navbar.Section>
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
          </Navbar.Section>
        </Navbar>
      }
      header={<Header {...disclosure} links={headerLinks} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}

{
  /* <Group>
{session ? (
  <Button
    rightIcon={
      <Avatar
        radius="xl"
        size="sm"
        src={session.user.image}
        className={classes.hiddenMobile}
      />
    }
    variant="subtle"
    onClick={async () => signOut()}
  >
    <SignOut />
    <Text className={classes.hiddenMobile}>Log out</Text>
  </Button>
) : (
  <Button variant="default" onClick={async () => signIn()}>
    <SignIn />
    <Text className={classes.hiddenMobile}>Sign up or Log in</Text>
  </Button>
)}
</Group> */
}
