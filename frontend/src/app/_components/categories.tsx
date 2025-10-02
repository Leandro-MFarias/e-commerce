"use client";

import { useCategories } from "@/hooks/categories";
import { Category } from "@/types/category";

import PlaystationLogo from "@/assets/icons/playstation.svg";
import NintendoLogo from "@/assets/icons/nintendo.svg";
import XboxLogo from "@/assets/icons/xbox.svg";
import { DollarSign, Loader2, Package } from "lucide-react";
import clsx from "clsx";
import { useProductsToShow } from "@/hooks/product";
import { useCategoryId } from "@/store/category";

type CategoryIconInfo = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  hover: string;
};

const categoryIcons: Record<string, CategoryIconInfo> = {
  "PlayStation 3": { icon: PlaystationLogo, hover: "text-blue-600" },
  XBOX: { icon: XboxLogo, hover: "text-lime-600" },
  Nintendo: { icon: NintendoLogo, hover: "text-red-600" },
  Promoções: { icon: DollarSign, hover: "text-yellow-500" },
};

export function Categories() {
  const { id, changeCategory } = useCategoryId();
  const { data: categories, isLoading } = useCategories();

  useProductsToShow(id!);

  return (
    <nav className="shadow-shape mx-auto mt-10 flex max-w-7xl justify-center rounded-full bg-neutral-800 py-2">
      <ul className="flex items-center space-x-20">
        <li>
          <button
            className={`cursor-poiter flex items-center space-x-2 font-bold transition duration-150 hover:text-orange-500 ${id === "" ? "text-orange-500" : "text-white"}`}
            onClick={() => changeCategory("")}
          >
            <Package size={30} />
            <p>Todos</p>
          </button>
        </li>
        {isLoading ? (
          <Loader2 className="animate-spin" size={40} />
        ) : (
          categories.map((category: Category) => {
            const categoryInfo = categoryIcons[category.name];
            if (!categoryInfo) return null;

            const Icon = categoryInfo.icon;

            return (
              <li
                key={category.id}
                className="flex items-center space-x-2"
                onClick={() => changeCategory(category.id)}
              >
                <button className="group flex cursor-pointer items-center space-x-2">
                  <Icon
                    className={clsx(
                      "h-10 w-10 text-white transition duration-150",
                      category.name === "PlayStation 3" &&
                        "group-hover:text-blue-600",
                      category.name === "XBOX" && "group-hover:text-lime-600",
                      category.name === "Nintendo" &&
                        "group-hover:text-red-600",
                      category.name === "Promoções" &&
                        "group-hover:text-yellow-500",
                    )}
                  />
                  <p
                    className={clsx(
                      "text-white transition duration-150",
                      category.name === "PlayStation 3" &&
                        "group-hover:text-blue-600",
                      category.name === "XBOX" && "group-hover:text-lime-600",
                      category.name === "Nintendo" &&
                        "group-hover:text-red-600",
                      category.name === "Promoções" &&
                        "group-hover:text-yellow-500",
                    )}
                  >
                    {category.name}
                  </p>
                </button>
              </li>
            );
          })
        )}
      </ul>
    </nav>
  );
}
