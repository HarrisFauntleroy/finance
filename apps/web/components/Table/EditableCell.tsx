import { Input } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { Cell } from "@tanstack/table-core";
import { useFormContext } from "react-hook-form";

type EditableCellProps<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cell: Cell<T, any>;
  editing: boolean;
};

export function EditableCell<T>({ cell, editing }: EditableCellProps<T>) {
  const { register } = useFormContext();

  return editing ? (
    <Input
      defaultValue={String(
        (cell.row.original as Record<string, unknown>)[cell.column.id as string]
      )}
      readOnly={!editing}
      {...register(cell.column.id)}
    />
  ) : (
    <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
  );
}
