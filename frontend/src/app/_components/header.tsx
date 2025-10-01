"use client";

import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useUser, useLogout } from "@/hooks/user-auth";
import { useSearchProduct } from "@/hooks/product";
import { Product } from "@/types/product";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function Header() {
  const { data: user, isLoading } = useUser();
  const { mutate: logout, isPending } = useLogout();
  const [search, setSearch] = useState("");
  const [menuDrop, setMenuDrop] = useState(false);
  const [searchMenu, setSearchMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: products } = useSearchProduct(search);

  function handleShowSearchProducts() {
    if (searchMenu && products?.length > 0) {
      return "block";
    } else {
      return "hidden";
    }
  }

  return (
    <>
      <header className="relative flex flex-col items-center justify-around space-y-3 border-b border-orange-500 px-4 pt-10 md:flex-row md:space-y-0 md:space-x-2 md:px-0 md:pb-6">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold text-orange-500 md:text-4xl">
            Reload Store
          </h1>
        </Link>

        <div className="relative w-full md:w-[60%]">
          <input
            type="text"
            className="w-full rounded-sm border-2 border-orange-500 bg-white px-4 py-2 text-neutral-700 outline-none"
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
              products.map((product: Product, index: number) => (
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
                  <div
                    className={`h-[1px] w-full bg-zinc-300 ${index === products.length - 1 && "hidden"}`}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="hidden items-center space-x-6 md:flex">
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

        <Menu
          className="absolute top-10 left-4 md:hidden"
          onClick={() => setIsOpen(true)}
        />
        <button className="absolute top-10 right-4 md:hidden">
          <ShoppingCart />
        </button>
      </header>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full px-2" side="top">
          <SheetHeader>
            <SheetTitle className="translate-y-3 text-lg">
              Olá, {user?.fullname}
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col items-center space-y-4 pb-6 pl-5 font-bold">
            <button
              className={`cursor-pointer text-xl text-zinc-200 transition duration-150 ease-in hover:scale-105`}
            >
              Meus pedidos
            </button>
            {user?.role === "ADMIN" && (
              <Link href={"/admin-page"}>
                <button
                  className={`cursor-pointer text-xl text-zinc-200 transition duration-150 ease-in hover:scale-105`}
                >
                  Admin Page
                </button>
              </Link>
            )}
            <button
              className={`cursor-pointer text-xl text-zinc-200 transition duration-150 ease-in hover:scale-105`}
              onClick={() => logout()}
              disabled={isPending}
            >
              Sair
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
