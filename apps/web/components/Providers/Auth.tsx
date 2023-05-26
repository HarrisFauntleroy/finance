import { useMemo, type PropsWithChildren } from "react";
import { AppPropsWithLayout } from "../../pages/_app";
import Auth from "../../pages/auth";

export function AuthProvider<T>({
  Component: { auth, roles },
  children,
}: AppPropsWithLayout & PropsWithChildren<T>) {
  const requiresAuth = useMemo(() => auth, [auth]);
  return requiresAuth ? <Auth roles={roles}>{children}</Auth> : <>{children}</>;
}
