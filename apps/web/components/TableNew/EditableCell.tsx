import { Input } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { Cell } from "@tanstack/table-core";
import { useFormContext } from "react-hook-form";

type EditableCellProps<TData, TColumnValue> = {
  cell: Cell<TData, TColumnValue>;
  editing: boolean;
};

export function EditableCellNew<TData, TColumnValue>({
  cell,
  editing,
}: EditableCellProps<TData, TColumnValue>) {
  const { register } = useFormContext();

  return editing ? (
    <Input
      defaultValue={String(
        (cell.row.original as TData)[cell.column.id as keyof TData]
      )}
      readOnly={!editing}
      {...register(cell.column.id)}
    />
  ) : (
    <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
  );
}
