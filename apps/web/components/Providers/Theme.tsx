import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { setCookie } from "cookies-next";
import { PropsWithChildren, ReactNode, useState } from "react";
import { AppPropsWithLayout } from "../../pages/_app";
import { Layout } from "../Layout";

export default function ThemeProvider<T>({
  children,
  ...props
}: AppPropsWithLayout & PropsWithChildren<T>) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  function getLayout(page: ReactNode) {
    return <Layout>{page}</Layout>;
  }

  function toggleColorScheme(value?: ColorScheme) {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        {getLayout(children)}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
