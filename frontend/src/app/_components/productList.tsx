"use client";

import { useAddToCart } from "@/hooks/cart";
import { useProducts, useProductsToShow } from "@/hooks/product";
import { useUser } from "@/hooks/user-auth";
import { useCategoryId } from "@/store/category";
// import { CartItem } from "@/types/cartItems";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export function ProductList() {
  const { id } = useCategoryId(); // store
  
  // Queries
  const { data: productToShow, isLoading: isLoadingCategory } =
    useProductsToShow(id!);
  const { data: allProducts, isLoading } = useProducts({ enabled: !id });
  const { data: user } = useUser();
  const { mutateAsync: addCart } = useAddToCart();

  if (isLoading || isLoadingCategory) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin" size={60} />
      </div>
    );
  }

  function handleAddToCart(productId: string) {
    if (!user) return toast.error("Precisa entrar na sua conta!");
    addCart(productId);
  }

  const products = id ? productToShow : allProducts;

  return (
    <div className="mx-auto mt-10 grid max-w-[1320px] justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products?.map((product: Product) => (
        <div
          key={product.id}
          className="shadow-dark relative flex h-[420px] w-80 flex-col space-y-6 rounded-lg border border-neutral-900 bg-neutral-900 px-3 py-6 transition duration-100 ease-in hover:border-neutral-600/70"
        >
          <button
            className={`absolute top-3 right-3 cursor-pointer transition duration-150 ease-in hover:scale-105 hover:text-orange-500 `}
            onClick={() => handleAddToCart(product.id)}
          >
            <ShoppingCart />
          </button>
          <Link
            href={`/product/${product.id}`}
            className="flex flex-1 flex-col"
          >
            <div className="flex-1 self-center">
              <Image
                src={product.imageUrl}
                width={120}
                height={120}
                alt={product.name}
                className="h-[150px] max-w-[130px] rounded-md"
              />
            </div>

            <div className="space-y-2">
              <p className="text-lg font-bold">{product.name}</p>
              <p className="text-muted-foreground truncate">
                {product.description}
              </p>
              <p className="font-semibold">{formatPrice(product.price)}</p>
            </div>
          </Link>

          <button className="w-full cursor-pointer rounded-md border border-orange-500 py-2 font-bold text-orange-500 transition duration-150 ease-in-out hover:bg-orange-500 hover:text-white">
            Comprar
          </button>
        </div>
      ))}
    </div>
  );
}
