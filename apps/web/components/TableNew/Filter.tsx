import { rankItem } from "@tanstack/match-sorter-utils";
import type { Column, Row, Table } from "@tanstack/react-table";
import { Debug } from "../Debug";

export function FilterNew<TData extends object>({
  column,
  table,
}: {
  column: Column<TData>;
  table: Table<TData>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div>
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder="Min"
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder="Max"
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder="Search..."
      className="w-36 border shadow rounded"
    />
  );
}

export const renderSubRowNew = <TData extends object>({
  row,
}: {
  row: Row<TData>;
}) => <Debug data={row.original} />;

export function fuzzyNew<T extends Record<string, unknown>>(
  row: Row<T>,
  columnId: string,
  value: string,
  addMeta: (meta: { itemRank: ReturnType<typeof rankItem> }) => void
): boolean {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
}
