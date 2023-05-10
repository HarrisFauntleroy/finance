import { ReactElement, ReactNode } from 'react';

import { initI18n } from '../i18n';
import SEO from '../next-seo.config';

import { trpc } from '../utils/trpc';
import Auth from './auth';

import type { Role } from 'database/generated/prisma-client';
import { type NextPage } from 'next';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { type AppProps } from 'next/app';
import { Layout } from '../components/Layout';
import { AppContext } from '../components/Providers';

type GetLayoutType = (page: ReactElement) => ReactNode;

interface NextPageWithLayoutProps {
  getLayout?: GetLayoutType;
  auth?: boolean;
  roles?: Role[];
}

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> &
  NextPageWithLayoutProps;

type AppPropsWithLayout = AppProps<{ session: Session | null }> & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <Layout>
        {Component.auth ? <Auth roles={Component.roles}>{page}</Auth> : page}
      </Layout>
    ));

  initI18n();

  return (
    <SessionProvider session={pageProps.session}>
      <DefaultSeo {...SEO} />
      <AppContext>{getLayout(<Component {...pageProps} />)}</AppContext>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
