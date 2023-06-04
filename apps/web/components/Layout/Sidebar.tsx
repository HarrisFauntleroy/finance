import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Navbar,
  Stack,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { SignIn, SignOut } from "@phosphor-icons/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { type LinkType } from "./Header";
import { MainLink } from "./MainLink";

const Sidebar = ({ links }: { links: LinkType[] }) => {
  const theme = useMantineTheme();
  const { data: session } = useSession();
  const userRole = session?.user.role;

  return (
    <Navbar width={{ base: 0, sm: 300 }} p="xs" hiddenBreakpoint="sm" hidden>
      <Navbar.Section grow mt="xs">
        <div>
          {links.map((link) => (
            <MainLink key={link.label} {...link} userRole={userRole} />
          ))}
        </div>
      </Navbar.Section>
      <Navbar.Section
        sx={{
          paddingTop: theme.spacing.sm,
          borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        }}
      >
        <Button.Group
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Button
            component={Link}
            href={session?.userId ? "/profile" : ""}
            onClick={session?.userId ? undefined : () => signIn()}
            variant="unstyled"
            leftIcon={<Avatar src={session?.user.image} radius="xl" />}
          >
            {session?.user ? (
              <Stack spacing="0" sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {session?.user.name}
                </Text>
                <Text color="dimmed" size="xs" style={{ overflow: "scroll" }}>
                  {session?.user.email}
                </Text>
              </Stack>
            ) : (
              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  Sign in
                </Text>
                <Text color="dimmed" size="xs">
                  Or sign up!
                </Text>
              </Box>
            )}
          </Button>
          {session?.userId ? (
            <ActionIcon onClick={() => signOut()}>
              <SignOut />
            </ActionIcon>
          ) : (
            <ActionIcon onClick={() => signIn()}>
              <SignIn />
            </ActionIcon>
          )}
        </Button.Group>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
