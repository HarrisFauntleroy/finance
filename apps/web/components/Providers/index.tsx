import React, { type ReactNode } from 'react';

import { IntlProvider } from 'components/Providers/I18n';
import { PrivacyProvider } from 'components/Providers/Privacy';
import Theme from 'components/Providers/Theme';

interface AppContextProps {
  children: ReactNode;
}

export function AppContext({ children }: AppContextProps) {
  return (
    <Theme>
      <PrivacyProvider>
        <IntlProvider>{children}</IntlProvider>
      </PrivacyProvider>
    </Theme>
  );
}
