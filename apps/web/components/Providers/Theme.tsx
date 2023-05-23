import { PropsWithChildren } from "react";

export default function ThemeProvider<T>({ children }: PropsWithChildren<T>) {
  // TODO: Move theme stuff back here
  return <>{children}</>;
}
