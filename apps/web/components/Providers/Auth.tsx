import { type PropsWithChildren } from "react";
import { AppPropsWithLayout } from "../../pages/_app";
import Auth from "../../pages/auth";

export function AuthProvider<T>({
  Component,
  children,
}: AppPropsWithLayout & PropsWithChildren<T>) {
  return <Auth roles={Component.roles}>{children}</Auth>;
}
