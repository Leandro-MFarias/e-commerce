"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  FilterFnOption,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { normalizeString } from "@/utils/normalizeString";
import { Product } from "@/types/product";
import { Loader2 } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Product[] | undefined;
  loading: boolean;
  fetching: boolean;
  searchFields?: string[];
  defaultSearch?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  fetching,
  searchFields = [],
  defaultSearch = "",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState(defaultSearch);

  const table = useReactTable({
    data: (data ?? []) as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    filterFns: {
      fuzzy: (row: { original: Product }, _, value: string) => {
        const data = row.original;
        const search = normalizeString(value);

        return searchFields.some((field) => {
          let fieldValue: string | number;

          if (field === "category") {
            fieldValue = data.categories?.[0]?.name;
          } else {
            fieldValue = data[field as keyof Product] as string | number;
          }

          return normalizeString(String(fieldValue)).includes(search);
        });
      },
    },
    globalFilterFn: "fuzzy" as FilterFnOption<TData>,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <div className="mt-20 flex w-full flex-col">
      <div className="flex items-center py-4">
        <input
          placeholder="Filtrar por nome, categoria..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="w-full rounded-md border-2 border-zinc-700 px-2 py-3 md:w-96"
        />
      </div>

      <div className="max-h-[660px] w-full overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="w-full">
                <TableCell
                  colSpan={columns.length}
                  className="items-cente flex h-24 w-full justify-center"
                >
                  <Loader2 className="animate-spin" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Sem resultados
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
            {fetching && (
              <TableRow className="w-full">
                <TableCell
                  colSpan={columns.length}
                  className="items-cente flex h-24 w-full justify-center"
                >
                  <Loader2 className="animate-spin" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
