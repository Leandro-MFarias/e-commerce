"use client";

import { useAddToCart } from "@/hooks/cart";
import { useGetProduct } from "@/hooks/product";
import { useUser } from "@/hooks/user-auth";
import { Category } from "@/types/category";
import { formatPrice } from "@/utils/formatPrice";
import { ArrowRightToLine, FileText, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface PropId {
  productId: string;
}

export function Product({ productId }: PropId) {
  const { data: user } = useUser();
  const { data: product, isLoading } = useGetProduct(productId);
  const { mutateAsync: addCart } = useAddToCart();

  const [showCartId, setShowCartId] = useState<string | null>(null);

  if (isLoading) return;

  function handleAddToCart(productId: string) {
    console.log("click");
    if (!user) return toast.error("Precisa entrar na sua conta!");
    setShowCartId(productId);

    setTimeout(() => setShowCartId(null), 1000);
    addCart(productId);
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1fr_380px] lg:px-32">
      <div className="my-10 flex flex-col space-y-2 pl-6 lg:hidden">
        <div className="flex items-center space-x-2">
          <p>Categoria:</p>
          {product.categories.map((category: Category) => (
            <p key={category.id} className="text-lg font-semibold">
              {category.name}
            </p>
          ))}
        </div>
        <p className="text-2xl font-bold">{product.name}</p>
      </div>

      {/* IMAGEM */}
      <div className="relative h-[460px] w-[420px] justify-self-center lg:mt-20 lg:h-[520px] lg:w-[420px]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg"
        />
      </div>

      {/* NAME AND CATEGORY*/}
      <div className="mt-16">
        <div className="hidden space-x-4 lg:flex">
          {product.categories.map((category: Category) => (
            <p key={category.id} className="mb-6 text-xl font-semibold">
              {category.name}
            </p>
          ))}
        </div>

        <div className="space-y-16">
          <p className="hidden text-3xl font-bold lg:block">{product.name}</p>

          <div className="mx-auto max-w-[90%] space-y-2 lg:mx-0 lg:max-w-[528px]">
            <div className="flex items-center space-x-2">
              <FileText className="text-orange-500" size={40} />
              <p className="text-xl font-bold">Descrição do Produto</p>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
        </div>
      </div>

      {/* PAYMENT */}
      <div className="shadow-dark bottom-0 mt-10 flex h-60 w-full flex-col space-y-4 rounded-md border bg-neutral-900 px-2 py-6 lg:static">
        <div className="flex flex-1 items-center space-x-10 lg:flex-col lg:items-start lg:space-x-0 lg:pt-4">
          <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
          <p className="font-semibold text-lime-500">
            Em estoque:{"  "}
            <span className="text-lg font-semibold text-white">
              {product.stock}
            </span>
          </p>
        </div>
        <button className="group flex w-full cursor-pointer items-center justify-center space-x-3 rounded-md bg-orange-500 py-1.5 font-semibold transition duration-150 ease-in hover:bg-orange-500/90">
          <ArrowRightToLine className="transition duration-150 ease-in group-hover:translate-x-1.5" />
          <p>Comprar Agora</p>
        </button>

        <button
          onClick={() => handleAddToCart(product.id)}
          className="group relative flex w-full cursor-pointer items-center justify-center space-x-3 rounded-md bg-orange-500 py-1.5 font-semibold transition duration-150 ease-in hover:bg-orange-500/90"
        >
          <ShoppingCart className="transition duration-150 ease-in group-hover:translate-x-1.5" />
          <p>Adicionar ao carrinho</p>
          {showCartId && (
            <ShoppingCart
              className="animate-float-cart absolute text-3xl text-orange-500"
              size={36}
            />
          )}
        </button>
      </div>
    </div>
  );
}
