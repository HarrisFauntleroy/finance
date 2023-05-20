import { useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Button,
  Avatar,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { BsCurrencyBitcoin } from 'react-icons/bs';
import { signIn, signOut, useSession } from 'next-auth/react';
import { SignIn, SignOut, type Icon } from '@phosphor-icons/react';
import { Role } from 'database/generated/prisma-client';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

type LinkType = {
  href: string;
  label: string;
  icon?: Icon;
  role?: Role;
};

interface HeaderResponsiveProps {
  links: LinkType[];
}

export default function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].href);
  const { classes, cx } = useStyles();
  const { data: session } = useSession();

  const handleLinkVisability = ({ role }: LinkType) => {
    if (role === 'ADMIN') {
      return session?.user.role === 'ADMIN';
    }
    return true;
  };

  const items = links.filter(handleLinkVisability).map((link) => (
    <Link
      key={link.label}
      href={link.href}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.href,
      })}
      onClick={() => {
        setActive(link.href);
        close();
      }}
    >
      {link.icon && <link.icon size={18} style={{ marginRight: 10 }} />}
      {link.label}
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} p="8px">
      <Container fluid className={classes.header}>
        <Button component={Link} href="/" variant="subtle">
          <BsCurrencyBitcoin size={28} color="#f7931a" />
        </Button>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Burger
          onClick={toggle}
          opened={opened}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
        <Group>
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
        </Group>
      </Container>
    </Header>
  );
}
