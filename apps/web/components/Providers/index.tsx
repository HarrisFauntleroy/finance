import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { type PropsWithChildren } from "react";
import SEO from "../../next-seo.config";
import { AppPropsWithLayout as AppPropertiesWithLayout } from "../../pages/_app";
import { IntlProvider } from "../Providers/I18n";
import { PrivacyProvider } from "../Providers/Privacy";
import ThemeProvider from "../Providers/Theme";
import { AuthProvider } from "./Auth";

export function AppContext<T>(
  properties: AppPropertiesWithLayout & PropsWithChildren<T>
) {
  const {
    children,
    pageProps: { session },
  } = properties;

  return (
    <SessionProvider session={session}>
      <DefaultSeo {...SEO} />
      <ThemeProvider {...properties}>
        <AuthProvider {...properties}>
          <PrivacyProvider>
            <IntlProvider>{children}</IntlProvider>
          </PrivacyProvider>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
