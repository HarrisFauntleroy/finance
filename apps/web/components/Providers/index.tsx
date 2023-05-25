import { Fragment, PropsWithChildren } from "react";

import { AppPropsWithLayout } from "../../pages/_app";
import { IntlProvider } from "../Providers/I18n";
import { PrivacyProvider } from "../Providers/Privacy";
import ThemeProvider from "../Providers/Theme";

export function AppContext<T>({
  children,
  ...props
}: AppPropsWithLayout & PropsWithChildren<T>) {
  return (
    <Fragment>
      <ThemeProvider {...props}>
        <PrivacyProvider>
          <IntlProvider>{children}</IntlProvider>
        </PrivacyProvider>
      </ThemeProvider>
    </Fragment>
  );
}
