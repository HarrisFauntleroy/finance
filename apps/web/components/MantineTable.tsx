import {
  Table as MantineTable,
  type TableProps as MantineTableProperties,
} from "@mantine/core";
import { PropsWithChildren } from "react";

type TableProperties<T> = PropsWithChildren<T> & MantineTableProperties;

export function Table<T>({ children }: TableProperties<T>) {
  return (
    <MantineTable
      striped
      verticalSpacing="xs"
      fontSize="sm"
      horizontalSpacing="sm"
    >
      {children}
    </MantineTable>
  );
}
