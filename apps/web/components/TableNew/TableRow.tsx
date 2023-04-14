import { ReactNode, useCallback, useState } from 'react';

import { EditableCellNew } from './EditableCell';

import { Button, ButtonGroup, Td, Tr } from '@chakra-ui/react';
import { Row } from '@tanstack/table-core';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  type FieldValues,
} from 'react-hook-form';
import { BsCheck, BsPencil, BsStop } from 'react-icons/bs';

type TableRowProps<T extends FieldValues> = {
  row: Row<T>;
  renderSubRow?: ({ row }: { row: Row<T> }) => ReactNode;
  onValidSubmit?: SubmitHandler<FieldValues>;
};

export function TableRowNew<T extends FieldValues>({
  row,
  renderSubRow,
  onValidSubmit,
}: TableRowProps<T>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const methods = useForm();

  const handleSave = useCallback(() => {
    if (onValidSubmit) {
      onValidSubmit(methods.getValues());
      setEditingId(null);
    }
  }, [methods, onValidSubmit]);

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
            <EditableCellNew cell={cell} editing={editing} />
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
          <Td colSpan={row.getVisibleCells().length}>
            {renderSubRow({ row })}
          </Td>
        </Tr>
      )}
    </FormProvider>
  );
}
