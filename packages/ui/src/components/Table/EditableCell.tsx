import { Input } from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';
import { Cell } from '@tanstack/table-core';
import { useFormContext } from 'react-hook-form';

interface EditableCellProps<T extends Record<string, unknown>> {
  cell: Cell<T, unknown>;
  editing: boolean;
}

export function EditableCell<T extends Record<string, unknown>>({
  cell,
  editing,
}: EditableCellProps<T>) {
  const { register } = useFormContext();

  return editing ? (
    <Input
      defaultValue={String(cell.row.original[cell.column.id])}
      readOnly={!editing}
      {...register(cell.column.id)}
    />
  ) : (
    <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
  );
}
