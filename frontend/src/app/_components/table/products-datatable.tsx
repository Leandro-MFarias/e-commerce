"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../../../types/product";
import { DataTable } from "./datatable";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import { useProducts } from "@/hooks/product";
import { ActionsProductCell } from "./actionsProductCell";

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const imageUrl = row.original.imageUrl;
      return (
        <div className="flex items-center space-x-2 pl-2">
          <Image
            src={imageUrl}
            alt={name}
            width={46}
            height={46}
            className="h-auto w-auto rounded-xs"
          />
          <span className="lg:truncate-none max-w-[160px] truncate lg:max-w-none">
            {name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Preço
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return <div>{formatPrice(price)}</div>;
    },
  },
  {
    id: "category",
    accessorFn: (row) => row.categories?.[0]?.name ?? "",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Categoria
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const name = row.getValue<string>("category");
      return <div>{name}</div>;
    },
    sortingFn: (rowA, rowB) => {
      const catA = rowA.original.categories[0]?.name ?? "";
      const catB = rowB.original.categories[0]?.name ?? "";
      return catA.localeCompare(catB);
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stock
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const stock = row.getValue("stock") as number;
      return <button className="pl-10">{stock}</button>;
    },
  },
  {
    header: "Ações",
    cell: ({ row }) => <ActionsProductCell product={row.original} />,
  },
];

export function ProducsDataTable() {
  const { data: products, isPending, isFetching } = useProducts();

  return (
    <DataTable
      columns={columns}
      data={products}
      loading={isPending}
      fetching={isFetching}
      searchFields={["name", "category", "stock"]}
    />
  );
}
