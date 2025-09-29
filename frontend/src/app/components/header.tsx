"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { NavigationBar } from "./navigation-bar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user";

export function Header() {
  const { user, getUser, logout } = useUserStore();
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    getUser();
  }, []);

  return (
    <header className="space-y-4 border-b border-orange-500 py-3 pt-10">
      <div className="flex items-center justify-between px-14">
        <h1 className="text-4xl font-bold text-orange-500">Reload Store</h1>

        <div className="flex w-[60%] items-center gap-4">
          <input
            type="text"
            className="text-muted-foreground w-[80%] rounded-sm bg-white px-4 py-2 outline-orange-500 focus:outline-2"
          />
          <div>
            {user ? (
              <div className="relative flex">
                <button
                  className="cursor-pointer transition duration-150 ease-in hover:scale-105"
                  onFocus={() => setLogoutOpen(true)}
                  onBlur={() => setLogoutOpen(false)}
                >
                  {user.fullname}
                </button>
                <div
                  onMouseDown={(e) => e.preventDefault()}
                  className={`absolute -bottom-20 w-[100px] space-y-1 rounded-sm bg-neutral-700 py-0.5 pl-1 ${logoutOpen ? "block" : "hidden"}`}
                >
                  <button
                    className={`cursor-pointer text-sm text-zinc-200 transition duration-150 ease-in hover:scale-105`}
                  >
                    Pedidos
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
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button>
            <Heart />
          </button>
          <div className="h-6 w-[1px] bg-zinc-500" />
          <button>
            <ShoppingCart />
          </button>
        </div>
      </div>
      <NavigationBar />
    </header>
  );
}
