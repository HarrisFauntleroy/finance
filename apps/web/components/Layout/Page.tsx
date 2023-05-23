import { Container, ContainerProps } from "@mantine/core";
import Head from "next/head";
import { PropsWithChildren } from "react";

type PageProps<T> = PropsWithChildren<T> & ContainerProps;

export function Page<T>({ title, children, ...props }: PageProps<T>) {
  return (
    <Container fluid h="100%" {...props}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>{children}</>
    </Container>
  );
}
