import { useMemo, type PropsWithChildren } from "react";
import { AppPropsWithLayout as AppPropertiesWithLayout } from "../../pages/_app";
import Auth from "../../pages/auth";

export function AuthProvider<T>({
  Component: { auth, roles },
  children,
}: AppPropertiesWithLayout & PropsWithChildren<T>) {
  const requiresAuth = useMemo(() => auth, [auth]);
  return requiresAuth ? <Auth roles={roles}>{children}</Auth> : <>{children}</>;
}
