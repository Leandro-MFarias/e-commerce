import { Product } from "@/types/product";

import { formatPrice } from "@/utils/formatPrice";
import { PackageCheck, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductItem {
  products: Product[];
  handleAddToCart: (productId: string) => void;
  showCartId: string | null;
}

export function ProductItem({
  products,
  showCartId,
  handleAddToCart,
}: ProductItem) {
  return (
    <>
      {products?.map((product: Product) => (
        <div
          key={product.id}
          className="shadow-dark relative flex h-[420px] w-80 flex-col space-y-6 rounded-lg border border-neutral-900 bg-neutral-900 px-3 py-6 transition duration-100 ease-in hover:border-neutral-600/70"
        >
          <div className="absolute top-3 right-3">
            <button
              className={`relative cursor-pointer transition duration-150 ease-in hover:scale-105 hover:text-orange-500`}
              onClick={() => handleAddToCart(product.id)}
            >
              <ShoppingCart />
              {showCartId === product.id && (
                <PackageCheck className="animate-float-cart absolute text-3xl text-orange-600" />
              )}
            </button>
          </div>
          <Link
            href={`/product/${product.id}`}
            className="flex flex-1 flex-col justify-between"
          >
            <div className="relative h-[160px] w-36 self-center">
              <Image
                src={product.imageUrl}
                fill
                alt={product.name}
                sizes="140px"
                className="object-fit rounded-md"
                priority
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
    </>
  );
}
