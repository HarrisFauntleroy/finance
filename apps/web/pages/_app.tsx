import { ReactElement, ReactNode, useState } from 'react'

import { initI18n } from '../i18n'
import SEO from '../next-seo.config'
import NextApp, {
  type AppProps,
  type AppContext as NextJsAppContext,
} from 'next/app'
import { trpc } from '../utils/trpc'
import Auth from './auth'

import type { Role } from 'database/generated/prisma-client'
import { type NextPage } from 'next'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'
import { Layout } from '../components/Layout'
import { AppContext } from '../components/Providers'
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { getCookie, setCookie } from 'cookies-next'
import { useHotkeys } from '@mantine/hooks'

type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode
  auth?: boolean
  roles?: Role[]
}

type AppPropsWithLayout = AppProps<{ session: Session | null }> & {
  Component: NextPageWithLayout
  colorScheme: ColorScheme
}

const MyApp = ({ Component, pageProps, ...props }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <Layout>
        {Component.auth ? <Auth roles={Component.roles}>{page}</Auth> : page}
      </Layout>
    ))

  initI18n()

  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme)

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
    setCookie('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <SessionProvider session={pageProps.session}>
      <DefaultSeo {...SEO} />
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <AppContext>{getLayout(<Component {...pageProps} />)}</AppContext>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  )
}

MyApp.getInitialProps = async (appContext: NextJsAppContext) => {
  const appProps = await NextApp.getInitialProps(appContext)
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'light',
  }
}

export default trpc.withTRPC(MyApp)
