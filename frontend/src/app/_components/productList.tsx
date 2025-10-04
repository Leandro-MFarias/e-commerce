"use client";

import { useAddToCart } from "@/hooks/cart";
import { useProducts, useProductsToShow } from "@/hooks/product";
import { useUser } from "@/hooks/user-auth";
import { useCategoryId } from "@/store/category";
import { useState } from "react";
import { toast } from "sonner";
import { ProductItem } from "./productItem";
import { Loader2 } from "lucide-react";

export function ProductList() {
  const { id } = useCategoryId();
  const { data: productToShow, isLoading: isLoadingCategory } =
    useProductsToShow(id!);
  const { data: allProducts, isLoading } = useProducts({ enabled: !id });
  const { data: user } = useUser();
  const { mutateAsync: addCart } = useAddToCart();

  const [showCartId, setShowCartId] = useState<string | null>(null);

  if (isLoading || isLoadingCategory) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin" size={60} />
      </div>
    );
  }

  function handleAddToCart(productId: string) {
    if (!user) return toast.error("Precisa entrar na sua conta!");
    setShowCartId(productId);

    setTimeout(() => setShowCartId(null), 1000);
    addCart(productId);
  }

  const products = id ? productToShow : allProducts;

  return (
    <div className="mx-auto mt-10 grid max-w-[1320px] justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <ProductItem
        products={products}
        handleAddToCart={handleAddToCart}
        showCartId={showCartId}
      />
    </div>
  );
}
