import { Th } from '@chakra-ui/react';
import type { Header } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

export function TableHeader<TData extends object>(
  header: Header<TData, unknown>,
) {
  return (
    <Th key={header.id}>
      {header.isPlaceholder ? null : (
        <button
          style={
            header.column.getCanSort()
              ? { cursor: 'pointer', userSelect: 'none' }
              : {}
          }
          onClick={header.column.getToggleSortingHandler()}
          onKeyDown={header.column.getToggleSortingHandler()}
          tabIndex={0}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          {{
            asc: ' 🔼',
            desc: ' 🔽',
          }[header.column.getIsSorted() as string] ?? null}
        </button>
      )}
    </Th>
  );
}
