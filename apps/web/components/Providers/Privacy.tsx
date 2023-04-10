/**
 *
 * Privacy provider
 * Adds global context for showing and hiding monetary values
 *
 */
import React, { useCallback, useMemo, type PropsWithChildren } from 'react';

import { useLocalStorage } from 'ui';

type PrivacyContextType = {
  privacy: boolean;
  togglePrivacy: () => void;
};

const defaultValues = {
  privacy: false,
  togglePrivacy: () => null,
};

export const PrivacyContext =
  React.createContext<PrivacyContextType>(defaultValues);

export function PrivacyProvider<T>({ children }: PropsWithChildren<T>) {
  const [privacy, setPrivacy] = useLocalStorage('privacy', false);

  const togglePrivacy = useCallback(
    () => setPrivacy((prevValue) => !prevValue),
    [setPrivacy],
  );

  const stuff = useMemo(
    () => ({ privacy, togglePrivacy }),
    [privacy, togglePrivacy],
  );

  return (
    <PrivacyContext.Provider value={stuff}>{children}</PrivacyContext.Provider>
  );
}
