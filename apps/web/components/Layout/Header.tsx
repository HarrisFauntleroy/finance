import {
  Burger,
  Container,
  Flex,
  Group,
  Header,
  Image,
  Paper,
  Text,
  Transition,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SignIn, SignOut } from "@phosphor-icons/react";
import { Role } from "database/generated/prisma-client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { MainLink } from "./MainLink";
import ThemeToggle from "./ThemeToggle";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },
  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingLeft: 0,
    marginLeft: 0,
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    "display": "flex",
    "alignItems": "center",
    "padding": `${rem(8)} ${rem(12)}`,
    "borderRadius": theme.radius.sm,
    "textDecoration": "none",
    "color":
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    "fontSize": theme.fontSizes.sm,
    "fontWeight": 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export type LinkType = {
  href?: string;
  label?: string;
  icon?: ReactNode;
  expectedRole?: Role;
  color?: string;
};

type HeaderResponsiveProperties = {
  links: LinkType[];
};

export default function HeaderResponsive({
  links,
}: HeaderResponsiveProperties) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].href);
  const { classes, cx } = useStyles();
  const session = useSession();
  const userRole = session?.data?.user?.role;

  return (
    <Header height={HEADER_HEIGHT} p="8px">
      <Container fluid className={classes.header}>
        <Link href="/" className={classes.link}>
          <Flex align="center" gap="8px">
            <Image
              src="/images/logodark.png"
              alt="Site logo"
              height={32}
              width={32}
            />
            <Text size="lg">Alchemical Finance</Text>
          </Flex>
        </Link>
        <Group>
          <ThemeToggle />
          <Burger
            onClick={toggle}
            opened={opened}
            className={classes.burger}
            size="sm"
          />
        </Group>
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {links.map((link) => (
                <MainLink
                  key={link.label}
                  className={cx(classes.link, {
                    [classes.linkActive]: active === link.href,
                  })}
                  onClick={() => {
                    setActive(link.href);
                    close();
                  }}
                  userRole={userRole}
                  {...link}
                />
              ))}
              {session ? (
                <MainLink
                  onClick={() => signOut({ redirect: false })}
                  className={classes.link}
                  label="Sign out"
                  icon={<SignOut />}
                  color="gray"
                />
              ) : (
                <MainLink
                  onClick={() => signIn()}
                  className={classes.link}
                  icon={<SignIn />}
                  label="Sign in"
                  color="gray"
                />
              )}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
