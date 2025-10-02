"use client";

import { useProducts, useProductsToShow } from "@/hooks/product";
import { useCategoryId } from "@/store/category";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";

export function ProductList() {
  const { id } = useCategoryId();

  const { data: productToShow, isLoading: isLoadingCategory } =
    useProductsToShow(id!);

  const { data: allProducts, isLoading } = useProducts({ enabled: !id });

  if (isLoading || isLoadingCategory) return;

  const products = id ? productToShow : allProducts;

  return (
    <div className="mx-auto mt-10 grid max-w-[1320px] grid-cols-4 justify-items-center gap-6">
      {products?.map((product: Product) => (
        <div
          key={product.id}
          className="shadow-dark flex h-[370px] w-80 flex-col space-y-6 rounded-lg bg-neutral-900 px-3 py-6"
        >
          <div className="flex-1 self-center">
            <Image
              src={product.imageUrl}
              width={120}
              height={120}
              alt={product.name}
              className="max-h-[160px] max-w-[130px] rounded-md"
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-bold">{product.name}</p>
            <p className="text-muted-foreground truncate">
              {product.description}
            </p>
            <p>{formatPrice(product.price)}</p>
            <button className="w-full rounded-md bg-orange-500 py-2 font-bold">
              Comprar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
