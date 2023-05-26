import type { Role } from "@alchemical-finance/database/generated/prisma-client";
import { ColorScheme } from "@mantine/core";
import { getCookie } from "cookies-next";
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

function MyApp(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  initI18n();

  return (
    <AppContext {...props}>
      <Component {...pageProps} />
    </AppContext>
  );
}

MyApp.getInitialProps = async (appContext: NextJsAppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "light",
  };
};

type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
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
