"use client";

import { useState } from "react";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import Image from "next/image";
import { useSearchProduct } from "@/hooks/product";
import { Product } from "@/types/product";

export function SearchInput() {
  const [search, setSearch] = useState("");
  const [searchMenu, setSearchMenu] = useState(false);

  const { data: products } = useSearchProduct(search);

  function handleShowSearchProducts() {
    if (searchMenu && products?.length > 0) {
      return "block";
    } else {
      return "hidden";
    }
  }

  return (
    <div className="relative w-full md:w-[60%]">
      <input
        type="text"
        className="w-full rounded-sm border-2 border-orange-500 bg-zinc-100 px-4 py-2 text-neutral-700 outline-none"
        placeholder="Procure seu jogo.."
        onFocus={() => setSearchMenu(true)}
        onBlur={() => setSearchMenu(false)}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div
        onMouseDown={(e) => e.preventDefault()}
        className={`absolute z-50 w-full translate-y-2 space-y-2 rounded-sm bg-white pt-2 pb-[1px] text-black ${handleShowSearchProducts()}`}
      >
        {products &&
          products.length > 0 &&
          products.map((product: Product, index: number) => (
            <div key={product.id} className="space-y-2 py-1">
              <Link href={`/product/${product.id}`}>
                <div className="flex w-full items-center space-x-4 pl-4">
                  <Image
                    src={product.imageUrl}
                    width={30}
                    height={30}
                    alt={product.name}
                  />
                  <div className="flex items-center space-x-2 text-neutral-500">
                    <p>{product.name}</p>
                    <span>-</span>
                    <p className="text-sm font-semibold text-black">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </Link>
              <div
                className={`h-[1px] w-full bg-zinc-300 ${index === products.length - 1 && "hidden"}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
