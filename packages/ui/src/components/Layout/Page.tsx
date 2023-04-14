import { Flex, StackProps } from '@chakra-ui/react';
import Head from 'next/head';
import { PropsWithChildren } from 'react';

type PageProps<T> = PropsWithChildren<T> & StackProps;

export function Page<T>({ title, children, ...props }: PageProps<T>) {
  return (
    <Flex flexDirection="column" flex={1} {...props}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>{children}</>
    </Flex>
  );
}
