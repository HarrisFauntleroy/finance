import {
  ActionIcon,
  Avatar,
  Button,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { SignIn, SignOut } from "@phosphor-icons/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import { Disclosure } from "./Sidebar";

function SignedInButton({ open }: { open: boolean }) {
  const session = useSession();
  const user = session.data?.user;

  return (
    <Tooltip label="Profile">
      <Button
        style={{
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        component={Link}
        href={"/profile"}
        variant="unstyled"
        leftIcon={!open && <Avatar size="sm" src={user?.image} />}
      >
        {open && <Avatar size="sm" src={user?.image} />}
        {!open && (
          <Stack spacing="0" w={200}>
            <Text truncate size="sm" weight={500}>
              {user?.name}
            </Text>
            <Text truncate color="dimmed" size="xs">
              {user?.email}
            </Text>
          </Stack>
        )}
      </Button>
    </Tooltip>
  );
}

function UnSignedInButton({ open }: { open: boolean }) {
  const session = useSession();
  const user = session.data?.user;

  return (
    <Button
      style={{
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      variant="unstyled"
      leftIcon={!open && <Avatar size="sm" src={user?.image} />}
    >
      {open && <Avatar size="sm" src={user?.image} />}
      {!open && (
        <Stack spacing="0" w={200} onClick={() => signIn()}>
          <Text truncate size="sm" weight={500}>
            Sign in
          </Text>
          <Text truncate color="dimmed" size="xs">
            Or sign up!
          </Text>
        </Stack>
      )}
    </Button>
  );
}

export const UserPanel = ({ disclosure }: { disclosure: Disclosure }) => {
  const session = useSession();
  const [open] = disclosure;

  const isSignedIn = session.data?.userId || "";

  function handleSignIn() {
    signIn();
  }

  function handleSignOut() {
    signOut({ redirect: false });
  }

  return (
    <Button.Group
      orientation={open ? "vertical" : "horizontal"}
      style={{ alignItems: "center" }}
    >
      {isSignedIn ? (
        <Fragment>
          <SignedInButton open={open} />
          <Tooltip label="Sign out">
            <ActionIcon variant="outline" onClick={handleSignOut}>
              <SignOut />
            </ActionIcon>
          </Tooltip>
        </Fragment>
      ) : (
        <Fragment>
          <UnSignedInButton open={open} />
          <Tooltip label="Sign in">
            <ActionIcon onClick={handleSignIn}>
              <SignIn />
            </ActionIcon>
          </Tooltip>
        </Fragment>
      )}
    </Button.Group>
  );
};
