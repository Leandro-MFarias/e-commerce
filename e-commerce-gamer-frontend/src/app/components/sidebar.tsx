"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavPage } from "@/store/nav";
import { useUserStore } from "@/store/user";
import { DoorOpen, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NewCategoryForm } from "./newCategoryForm";

export function SideBar() {
  const [ isOpen, setIsOpen ] = useState(false)
  const { logout } = useUserStore();
  const pathname = usePathname();
  const { page, changePage } = useNavPage();

  const nav = [
    { name: "Produtos", href: "/admin-page" },
    { name: "Clientes", href: "/admin-page/customers" },
    { name: "Vendas", href: "/admin-page/sales" },
    { name: "Novo produto", href: "/admin-page/new-product" },
  ];

  useEffect(() => {
    const currentIndex = nav.findIndex((item) => item.href === pathname);
    if (currentIndex !== -1) changePage(currentIndex);
  }, [pathname]);

  return (
    <>
      <nav className="hidden h-full min-w-[280px] flex-col justify-between border-r border-zinc-600 px-6 pt-14 pb-8 md:flex">
        <div className="flex flex-col space-y-16">
          <Link href={"/"}>
            <h1 className="text-3xl font-bold text-orange-500">Reload Store</h1>
          </Link>

          <div className="text-muted-foreground flex flex-col space-y-6">
            {nav.map((item, i) => (
              <Link key={i} href={item.href}>
                <button
                  className={`w-full cursor-pointer px-2 py-2 text-start text-xl ${page === i && "rounded-md border-2 border-neutral-700/80 bg-zinc-800 text-white"}`}
                  onClick={() => changePage(i)}
                >
                  {item.name}
                </button>
                {i === 2 && (
                  <div className="mt-4 h-[1px] w-full bg-neutral-700" />
                )}
              </Link>
            ))}
            <button
              className={`w-full cursor-pointer px-2 py-2 text-start text-xl text-orange-600 transition duration-150 ease-in hover:text-orange-500`}
              onClick={() => setIsOpen(true)}
            >
              Nova categoria
            </button>
          </div>
        </div>

        <button
          onClick={() => logout()}
          className="flex cursor-pointer items-center space-x-2 transition-all duration-150 ease-in hover:-translate-y-1"
        >
          <DoorOpen />
          <p>Sair</p>
        </button>
      </nav>
      <Sheet>
        <SheetTrigger className="absolute cursor-pointer pt-10 pl-8 transition duration-150 ease-in hover:scale-105 md:hidden">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col justify-between pb-10"
        >
          <SheetHeader>
            <SheetTitle>
              <Link href={"/"}>
                <h1 className="text-3xl font-bold text-orange-500">
                  Reload Store
                </h1>
              </Link>
            </SheetTitle>
            <SheetDescription></SheetDescription>
            <div className="text-muted-foreground mt-6 flex flex-col space-y-4 pr-10">
              {nav.map((item, i) => (
                <Link key={i} href={item.href}>
                  <button
                    className={`w-full cursor-pointer px-2 py-2 text-start text-xl ${page === i && "rounded-md border-2 border-neutral-700/80 bg-zinc-800 text-white"}`}
                    onClick={() => changePage(i)}
                  >
                    {item.name}
                  </button>
                  {i === 2 && (
                    <div className="mt-4 h-[1px] w-full bg-neutral-700" />
                  )}
                </Link>
              ))}
              <button
                className={`w-full cursor-pointer px-2 py-2 text-start text-xl text-orange-600 transition duration-150 ease-in hover:text-orange-500`}
                onClick={() => setIsOpen(true)}
              >
                Nova categoria
              </button>
            </div>
          </SheetHeader>
          <button
            onClick={() => logout()}
            className="flex cursor-pointer items-center space-x-2 pl-4 text-xl transition-all duration-150 ease-in hover:-translate-y-1"
          >
            <DoorOpen />
            <p>Sair</p>
          </button>
        </SheetContent>
      </Sheet>
      <NewCategoryForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
