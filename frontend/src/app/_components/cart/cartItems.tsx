"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useDeleteToCart, useUpdateCart } from "@/hooks/cart";
import { CartItem } from "@/types/cartItems";
import { formatPrice } from "@/utils/formatPrice";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import Image from "next/image";

interface ProductsProps {
  products: CartItem[];
}

export function CartItems({ products }: ProductsProps) {
  const { mutateAsync: deleteItem } = useDeleteToCart();
  const { mutateAsync: updateItem } = useUpdateCart();

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
    <ScrollArea className="shadow-dark h-[72vh] w-full rounded-md border border-neutral-600/80 px-4">
      {products?.map((item: CartItem) => (
        <div key={item.id} className="mt-6 space-y-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div className="relative h-20 w-20">
                <Image
                  src={item?.product?.imageUrl?.trim()}
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
                    onClick={() => decreaseQuantity(item.id, item.quantity)}
                    className="h-6 w-6 cursor-pointer rounded-md bg-neutral-600 transition duration-150 ease-in hover:bg-orange-500"
                  />
                  <p>{item.quantity}</p>
                  <ChevronRight
                    onClick={() => increseQuantity(item.id, item.quantity)}
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
  );
}
