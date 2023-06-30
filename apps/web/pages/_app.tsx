import { ColorScheme } from "@mantine/core";
import { getCookie } from "cookies-next";
import type { Role } from "database/generated/prisma-client";
import { type NextPage } from "next";
import { type Session } from "next-auth";
import NextApp, {
  type AppProps,
  type AppContext as NextJsAppContext,
} from "next/app";
import { ReactElement, ReactNode } from "react";
import { AppContext } from "../components/Providers";
import { initI18n } from "../i18n";
import { trpc } from "../utils/trpc";

function MyApp(properties: AppPropsWithLayout) {
  const { Component, pageProps } = properties;
  initI18n();

  return (
    <AppContext {...properties}>
      <Component {...pageProps} />
    </AppContext>
  );
}

MyApp.getInitialProps = async (appContext: NextJsAppContext) => {
  const appProperties = await NextApp.getInitialProps(appContext);
  return {
    ...appProperties,
    colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "light",
  };
};

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth?: boolean;
  roles?: Role[];
};

export type AppPropsWithLayout = AppProps<{ session: Session | null }> & {
  Component: NextPageWithLayout;
  colorScheme: ColorScheme;
};

export default trpc.withTRPC(MyApp);
