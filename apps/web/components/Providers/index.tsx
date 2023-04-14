import { PropsWithChildren } from 'react';

import { IntlProvider } from 'components/Providers/I18n';
import { PrivacyProvider } from 'components/Providers/Privacy';
import Theme from 'components/Providers/Theme';

export function AppContext<T>({ children }: PropsWithChildren<T>) {
  return (
    <Theme>
      <PrivacyProvider>
        <IntlProvider>{children}</IntlProvider>
      </PrivacyProvider>
    </Theme>
  );
}
