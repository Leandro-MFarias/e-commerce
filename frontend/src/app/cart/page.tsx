"use client";

import { Header } from "../_components/header/header";
import { Loader2, PackageSearch } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { TotalPrice } from "@/utils/totalPrice";
import { CartItems } from "../_components/cart/cartItems";
import { useCartItems } from "@/hooks/cart";
import { ProtectedPage } from "../_components/protectedPage";
import { useCheckout } from "@/hooks/useCheckout";

export default function CartPage() {
  const { data: products, isLoading, isFetching } = useCartItems();
  const { mutate: checkout, isPending } = useCheckout();

  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" size={60} />
      </div>
    );
  }

  function handleCheckout() {
    checkout(undefined, {
      onSuccess: (data) => {
        window.location.href = data.checkoutUrl;
      },
      onError: (error) => {
        alert("Erro ao iniciar o pagamento: " + (error as Error).message);
      },
    });
  }

  return (
    <ProtectedPage>
      <div>
        <Header />
        {products?.length === 0 ? (
          <p className="mt-20 flex justify-center text-3xl">
            Seu carrino está vazio!
          </p>
        ) : (
          <div className="mx-auto mt-10 grid max-w-7xl justify-items-center gap-6 md:grid-cols-[1fr_300px]">
            <CartItems products={products} />

            {/* RESUME */}
            <div className="shadow-dark fixed bottom-0 flex h-40 w-full flex-col justify-between space-y-3 rounded-md border bg-neutral-900 px-4 py-2 pb-6 md:static md:bg-transparent md:pb-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <PackageSearch className="text-orange-500" />
                  <p>RESUMO</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg">Valor total:</p>
                  <p>{formatPrice(TotalPrice(products))}</p>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isPending}
                className="w-full cursor-pointer rounded-md bg-orange-500 py-3 transition duration-150 ease-in hover:bg-orange-600"
              >
                {isPending ? "Redirecionando.." : "Finalizar compra"}
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedPage>
  );
}