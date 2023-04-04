import { EditableCell } from './EditableCell';
import { Button, ButtonGroup, Td, Tr } from '@chakra-ui/react';
import { Row } from '@tanstack/table-core';
import React, { ReactNode, useCallback, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { BsCheck, BsPencil, BsStop } from 'react-icons/bs';

interface TableRowProps<T> {
  row: Row<any>;
  renderSubRow?: ({ row }: { row: Row<T> }) => ReactNode;
  onValidSubmit: SubmitHandler<any>;
}

export function TableRow<T>({
  row,
  renderSubRow,
  onValidSubmit,
}: TableRowProps<T>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const methods = useForm();

  const handleSave = useCallback(() => {
    onValidSubmit(methods.getValues());
    setEditingId(null);
  }, [onValidSubmit]);

  const handleCancel = () => {
    setEditingId(null);
  };

  const editing = editingId === row.id;
  const handleEdit = () => setEditingId(row.id);

  return (
    <FormProvider {...methods} key={row.id}>
      <Tr>
        {row.getVisibleCells().map((cell) => (
          <Td key={cell.id}>
            <EditableCell cell={cell} editing={editing} />
          </Td>
        ))}

        <Td>
          {editing ? (
            <ButtonGroup>
              <Button onClick={() => handleSave()}>
                <BsCheck color="green" />
              </Button>
              <Button onClick={handleCancel}>
                <BsStop color="red" />
              </Button>
            </ButtonGroup>
          ) : (
            <Button onClick={handleEdit}>
              <BsPencil color="blue" />
            </Button>
          )}
        </Td>
      </Tr>
      {renderSubRow && row.getIsExpanded() && (
        <Tr>
          {/* 2nd row is a custom 1 cell row */}
          <Td colSpan={row.getVisibleCells().length}>
            {renderSubRow({ row })}
          </Td>
        </Tr>
      )}
    </FormProvider>
  );
}
