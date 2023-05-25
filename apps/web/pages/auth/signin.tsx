import { Button, Flex, Stack } from "@chakra-ui/react";
import type { NextPageContext } from "next";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import type { ReactElement } from "react";
import { BsGoogle } from "react-icons/bs";

type Provider = {
  id: string;
  name: string;
};

type Providers = Provider[];

type SignInProps = {
  providers: Providers;
  csrfToken: string;
};

export const getServerSideProps = async (context: NextPageContext) => ({
  props: {
    providers: await getProviders(),
    csrfToken: await getCsrfToken(context),
  },
});

const Signin = ({ providers }: SignInProps) => {
  const icons: { [key: Provider["id"]]: ReactElement } = {
    google: <BsGoogle />,
  };

  return (
    <Flex
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="column" align="center">
        {providers &&
          Object.values(providers).map((provider) => (
            <Button
              size="lg"
              leftIcon={icons[provider.id]}
              maxWidth="max-content"
              key={provider.id}
              onClick={async () => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </Button>
          ))}
      </Stack>
    </Flex>
  );
};

Signin.auth = false;
export default Signin;
