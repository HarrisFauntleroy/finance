import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
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
  const session = useSession();
  const userRole = session?.data?.user?.role;
  const userId = session.data?.userId || "";
  const user = session.data?.user;

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
        <Grid columns={5}>
          <Grid.Col span={4}>
            {user ? (
              <Button
                style={{
                  display: "flex",
                  padding: 0,
                }}
                component={Link}
                href={"/profile"}
                variant="unstyled"
                leftIcon={<Avatar size="sm" src={user?.image} radius="xl" />}
              >
                <Stack spacing="0" w={200}>
                  <Text truncate size="sm" weight={500}>
                    {user.name}
                  </Text>
                  <Text truncate color="dimmed" size="xs">
                    {user.email}
                  </Text>
                </Stack>
              </Button>
            ) : (
              <Button
                variant="unstyled"
                onClick={() => signIn()}
                leftIcon={<Avatar size="sm" radius="xl" />}
              >
                <Box sx={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    Sign in
                  </Text>
                  <Text color="dimmed" size="xs">
                    Or sign up!
                  </Text>
                </Box>
              </Button>
            )}
          </Grid.Col>

          <Grid.Col span={1}>
            <Flex
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {userId ? (
                <ActionIcon onClick={() => signOut({ redirect: false })}>
                  <SignOut />
                </ActionIcon>
              ) : (
                <ActionIcon onClick={() => signIn()}>
                  <SignIn />
                </ActionIcon>
              )}
            </Flex>
          </Grid.Col>
        </Grid>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
