"use client";

import { Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useUser, useLogout } from "@/hooks/user-auth";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SearchInput } from "./searchInput";

export function Header() {
  const { data: user, isLoading } = useUser();
  const { mutate: logout, isPending } = useLogout();

  const [menuDrop, setMenuDrop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    logout();
    setIsOpen(false);
  }

  return (
    <>
      <header className="relative flex flex-col items-center justify-around space-y-3 border-b border-orange-500 px-4 pt-10 md:flex-row md:space-y-0 md:space-x-2 md:px-0 md:pb-6">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold text-orange-500 md:text-4xl">
            Reload Store
          </h1>
        </Link>

        <SearchInput />

        <div className="hidden items-center space-x-6 md:flex">
          {isLoading ? (
            <p>carregando..</p>
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
                  <Link href={"/dashboard"}>
                    <button
                      className={`cursor-pointer text-sm text-zinc-200 transition duration-150 ease-in hover:scale-105`}
                    >
                      Dashboard
                    </button>
                  </Link>
                )}
                <button
                  className={`cursor-pointer text-sm text-zinc-200 transition duration-150 ease-in hover:scale-105`}
                  onClick={handleLogout}
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

          {user && (
            <>
              <div className="h-6 w-[1px] bg-zinc-500" />
              <Link href={"/cart"}>
                <button className="relative cursor-pointer transition duration-150 ease-in hover:scale-105">
                  <ShoppingBag />
                  <span className="absolute -top-2 -right-3 flex w-5 items-center justify-center rounded-full bg-red-600 text-sm font-semibold">
                    {user?.cartItems?.length}
                  </span>
                </button>
              </Link>
            </>
          )}
        </div>

        {user ? (
          <>
            <Menu
              className="absolute top-10 left-4 md:hidden"
              onClick={() => setIsOpen(true)}
            />
            <Link href={"/cart"} className="absolute top-10 right-4">
              <button className="relative cursor-pointer transition duration-150 ease-in hover:scale-105 md:hidden">
                <ShoppingBag />
                <span className="absolute -top-2 -right-3 flex w-5 items-center justify-center rounded-full bg-red-600 text-sm font-semibold">
                  {user?.cartItems?.length}
                </span>
              </button>
            </Link>
          </>
        ) : (
          <Link href={"/login"} className="absolute top-12 right-6">
            <button className="cursor-pointer transition duration-150 ease-in hover:scale-105">
              Entrar
            </button>
          </Link>
        )}
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
                  Dashboard
                </button>
              </Link>
            )}
            <button
              className={`cursor-pointer text-xl text-zinc-200 transition duration-150 ease-in hover:scale-105`}
              onClick={handleLogout}
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
