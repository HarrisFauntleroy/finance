import { Center, Text } from "@chakra-ui/react";
import { Role } from "database/generated/prisma-client";
import type { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { Fragment, PropsWithChildren } from "react";

type AuthProps<T> = PropsWithChildren<T> & {
  roles?: Role[];
};

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return { props: { session } };
};

function Auth<T>({ children, roles }: AuthProps<T>) {
  const { data: session, status } = useSession({
    required: true,
  });

  const userRole = session?.user?.role || Role.GUEST;
  const rolesArray = roles || [Role.USER];
  const roleAllowed = rolesArray.includes(userRole) || userRole === Role.ADMIN;

  const CenterMessage = ({ message }: { message: string }) => (
    <Center height="100%">
      <Text>{message}</Text>
    </Center>
  );

  if (status === "loading") {
    return <CenterMessage message="Loading..." />;
  }

  if (!session) {
    return <CenterMessage message="You must be logged in to view this page." />;
  }

  if (!roleAllowed) {
    return (
      <CenterMessage message="You do not have the necessary permissions to view this page." />
    );
  }

  return <Fragment>{children}</Fragment>;
}

export default Auth;
