import { ReactNode, useCallback, useState } from "react";

import { EditableCell } from "./EditableCell";

import { Row } from "@tanstack/table-core";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { BsCheck, BsPencil, BsStop } from "react-icons/bs";
import { Button, Group } from "@mantine/core";

type TableRowProps<T> = {
  row: Row<T>;
  renderSubRow?: ({ row }: { row: Row<T> }) => ReactNode;
  onValidSubmit: SubmitHandler<FieldValues>;
};

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
  }, [methods, onValidSubmit]);

  const handleCancel = () => {
    setEditingId(null);
  };

  const editing = editingId === row.id;
  const handleEdit = () => setEditingId(row.id);

  return (
    <FormProvider {...methods} key={row.id}>
      <tr>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            <EditableCell cell={cell} editing={editing} />
          </td>
        ))}

        <td>
          {editing ? (
            <Group>
              <Button onClick={() => handleSave()}>
                <BsCheck color="green" />
              </Button>
              <Button onClick={handleCancel}>
                <BsStop color="red" />
              </Button>
            </Group>
          ) : (
            <Button onClick={handleEdit}>
              <BsPencil color="blue" />
            </Button>
          )}
        </td>
      </tr>
      {renderSubRow && row.getIsExpanded() && (
        <tr>
          {/* 2nd row is a custom 1 cell row */}
          <td colSpan={row.getVisibleCells().length}>
            <>{renderSubRow({ row })}</>
          </td>
        </tr>
      )}
    </FormProvider>
  );
}
