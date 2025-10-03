"use client";

import { useCartItems, useDeleteToCart, useUpdateCart } from "@/hooks/cart";
import { Header } from "../_components/header";
import { CartItem } from "@/types/cartItems";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  PackageSearch,
  Trash,
} from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TotalPrice } from "@/utils/totalPrice";

export default function CartPage() {
  const { data: products, isLoading } = useCartItems();
  const { mutateAsync: deleteItem } = useDeleteToCart();
  const { mutateAsync: updateItem } = useUpdateCart();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" size={60} />
      </div>
    );
  }

  function decreaseQuantity(cartItemId: string, quantity: number) {
    if (quantity === 1) {
      deleteItem(cartItemId);
    }
    return updateItem({ cartItemId, quantity: quantity - 1 });
  }

  function increseQuantity(cartItemId: string, quantity: number) {
    return updateItem({ cartItemId, quantity: quantity + 1 });
  }

  return (
    <div>
      <Header />
      {products?.length === 0 ? (
        <p className="mt-20 flex justify-center text-3xl">
          Seu carrino está vazio!
        </p>
      ) : (
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-[1fr_300px] justify-items-center gap-6">
          <ScrollArea className="shadow-dark h-[70vh] w-full rounded-md border border-neutral-600/80 px-4">
            {products?.map((item: CartItem) => (
              <div key={item.id} className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <div className="flex space-x-4">
                    <div className="relative h-20 w-20">
                      <Image
                        src={item.product.imageUrl.trim()}
                        fill
                        alt={item.product.name}
                        sizes="80px"
                        className="object-fit rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="pl-2">{formatPrice(item.product.price)}</p>

                      <div className="flex items-center space-x-4">
                        <ChevronLeft
                          onClick={() =>
                            decreaseQuantity(item.id, item.quantity)
                          }
                          className="h-6 w-6 cursor-pointer rounded-md bg-neutral-600 transition duration-150 ease-in hover:bg-orange-500"
                        />
                        <p>{item.quantity}</p>
                        <ChevronRight
                          onClick={() =>
                            increseQuantity(item.id, item.quantity)
                          }
                          className="h-6 w-6 cursor-pointer rounded-md bg-neutral-600 transition duration-150 ease-in hover:bg-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="mr-4 cursor-pointer transition duration-150 ease-in hover:text-red-600"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash />
                  </button>
                </div>
                <div className="h-[1px] w-full bg-neutral-600" />
              </div>
            ))}
          </ScrollArea>

          {/* RESUME */}
          <div className="shadow-dark h-60 w-full rounded-md border px-4 py-2">
            <div className="flex items-center space-x-2">
              <PackageSearch className="text-orange-500" />
              <p>RESUMO</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Valor total dos Produtos:</p>
              <p>{formatPrice(TotalPrice(products))}</p>
            </div>

            <button className="w-full rounded-md bg-orange-500 py-3">
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
