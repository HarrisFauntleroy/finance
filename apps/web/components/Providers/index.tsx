import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { type PropsWithChildren } from "react";
import SEO from "../../next-seo.config";
import { AppPropsWithLayout } from "../../pages/_app";
import { IntlProvider } from "../Providers/I18n";
import { PrivacyProvider } from "../Providers/Privacy";
import ThemeProvider from "../Providers/Theme";

export function AppContext<T>({
  children,
  ...props
}: AppPropsWithLayout & PropsWithChildren<T>) {
  const {
    pageProps: { session },
  } = props;

  return (
    <SessionProvider session={session}>
      <DefaultSeo {...SEO} />
      <ThemeProvider {...props}>
        <PrivacyProvider>
          <IntlProvider>{children}</IntlProvider>
        </PrivacyProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
