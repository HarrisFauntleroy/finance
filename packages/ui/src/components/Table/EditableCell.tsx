import { Input } from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';
import { Cell } from '@tanstack/table-core';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface EditableCellProps<T> {
  cell: Cell<T, any>;
  editing: boolean;
}

export function EditableCell<T>({ cell, editing }: EditableCellProps<T>) {
  const { register } = useFormContext();

  return editing ? (
    <Input
      defaultValue={cell.row.original[cell.column.id]}
      readOnly={!editing}
      {...register(cell.column.id)}
    />
  ) : (
    <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
  );
}
