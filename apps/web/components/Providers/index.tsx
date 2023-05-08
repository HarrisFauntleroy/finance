import { PropsWithChildren } from 'react';

import { IntlProvider } from '../Providers/I18n';
import { PrivacyProvider } from '../Providers/Privacy';
import ThemeProvider from '../Providers/Theme';

export function AppContext<T>({ children }: PropsWithChildren<T>) {
  return (
    <ThemeProvider>
      <PrivacyProvider>
        <IntlProvider>{children}</IntlProvider>
      </PrivacyProvider>
    </ThemeProvider>
  );
}
