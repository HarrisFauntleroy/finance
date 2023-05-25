import { ReactElement, ReactNode } from "react";

import NextApp, {
  type AppProps,
  type AppContext as NextJsAppContext,
} from "next/app";
import { initI18n } from "../i18n";
import SEO from "../next-seo.config";
import { trpc } from "../utils/trpc";

import { ColorScheme } from "@mantine/core";
import { getCookie } from "cookies-next";
import type { Role } from "database/generated/prisma-client";
import { type NextPage } from "next";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { AppContext } from "../components/Providers";

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

function MyApp(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  initI18n();

  return (
    <SessionProvider session={pageProps.session}>
      <DefaultSeo {...SEO} />
      <AppContext {...props}>
        <Component {...pageProps} />
      </AppContext>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext: NextJsAppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "light",
  };
};

export default trpc.withTRPC(MyApp);
