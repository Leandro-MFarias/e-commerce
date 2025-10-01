"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useUser, useLogout } from "@/hooks/user-auth";
import { useSearchProduct } from "@/hooks/product";
import { Product } from "@/types/product";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";

export function Header() {
  const { data: user, isLoading } = useUser();
  const { mutate: logout, isPending } = useLogout();
  const [search, setSearch] = useState("");
  const [menuDrop, setMenuDrop] = useState(false);
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
    <header className="space-y-4 border-b border-orange-500 pb-6 pt-10">
      <div className="flex items-center justify-between px-20">
        <Link href={"/"}>
          <h1 className="text-4xl font-bold text-orange-500">Reload Store</h1>
        </Link>

        <div className="relative w-[60%]">
          <input
            type="text"
            className="w-[100%] rounded-sm border-2 border-orange-500 bg-white px-4 py-2 text-neutral-700 outline-none"
            placeholder="Procure seu jogo.."
            onFocus={() => setSearchMenu(true)}
            onBlur={() => setSearchMenu(false)}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            onMouseDown={(e) => e.preventDefault()}
            className={`absolute w-full translate-y-2 space-y-2 rounded-sm bg-white pt-2 pb-[1px] text-black ${handleShowSearchProducts()}`}
          >
            {products &&
              products.length > 0 &&
              products.map((product: Product) => (
                <div key={product.id} className="space-y-2">
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
                        <p className="text-sm">{formatPrice(product.price)}</p>
                      </div>
                    </div>
                  </Link>
                  <div className={`h-[1px] w-full bg-zinc-300`} />
                </div>
              ))}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {isLoading ? (
            <p>carregando...</p>
          ) : user ? (
            <div className="relative flex w-full">
              <button
                className="cursor-pointer transition duration-150 ease-in hover:scale-105"
                onFocus={() => setMenuDrop(true)}
                onBlur={() => setMenuDrop(false)}
              >
                {user.fullname}
              </button>
              <div
                onMouseDown={(e) => e.preventDefault()}
                className={`shadow-shape absolute -bottom-28 -left-12 flex w-[120px] flex-col items-start space-y-3 rounded-sm bg-neutral-900 px-2 py-2 ${menuDrop ? "block" : "hidden"}`}
              >
                <button
                  className={`cursor-pointer text-sm text-zinc-200 transition duration-150 ease-in hover:scale-105`}
                >
                  Meus pedidos
                </button>
                {user.role === "ADMIN" && (
                  <Link href={"/admin-page"}>
                    <button
                      className={`cursor-pointer text-sm text-zinc-200 transition duration-150 ease-in hover:scale-105`}
                    >
                      Admin Page
                    </button>
                  </Link>
                )}
                <button
                  className={`cursor-pointer text-sm text-zinc-200 transition duration-150 ease-in hover:scale-105`}
                  onClick={() => logout()}
                  disabled={isPending}
                >
                  Sair
                </button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-1">
              <Link href={"/login"}>
                <button className="cursor-pointer transition duration-150 ease-in hover:scale-105">
                  Entrar
                </button>
              </Link>
              <p>/</p>
              <Link href={"/register"}>
                <button className="cursor-pointer transition duration-150 ease-in hover:scale-105">
                  Cadastrar
                </button>
              </Link>
            </div>
          )}

          <div className="h-6 w-[1px] bg-zinc-500" />

          <button>
            <ShoppingCart />
          </button>
        </div>
      </div>
    </header>
  );
}
