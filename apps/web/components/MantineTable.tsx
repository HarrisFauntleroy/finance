import {
  Table as MantineTable,
  type TableProps as MantineTableProps,
} from "@mantine/core";
import { PropsWithChildren } from "react";

type TableProps<T> = PropsWithChildren<T> & MantineTableProps;

export function Table<T>({ children }: TableProps<T>) {
  return (
    <MantineTable
      striped
      highlightOnHover
      //   verticalSpacing="xs"
      //   fontSize="sm"
      //   horizontalSpacing="sm"
      //   withBorder
      //   withColumnBorders
    >
      {children}
    </MantineTable>
  );
}
