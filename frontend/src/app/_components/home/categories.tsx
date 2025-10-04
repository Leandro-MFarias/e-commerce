"use client";

import { useCategories } from "@/hooks/categories";
import { Category } from "@/types/category";

import PlaystationLogo from "@/assets/icons/playstation.svg";
import NintendoLogo from "@/assets/icons/nintendo.svg";
import XboxLogo from "@/assets/icons/xbox.svg";
import { DollarSign, Package } from "lucide-react";
import { useProductsToShow } from "@/hooks/product";
import { useCategoryId } from "@/store/category";

type CategoryIconInfo = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  hover: string;
};

const categoryIcons: Record<string, CategoryIconInfo> = {
  PlayStation: {
    icon: PlaystationLogo,
    color: "text-blue-600",
    hover: "group-hover:text-blue-600",
  },
  Xbox: {
    icon: XboxLogo,
    color: "text-lime-600",
    hover: "group-hover:text-lime-600",
  },
  Nintendo: {
    icon: NintendoLogo,
    color: "text-red-600",
    hover: "group-hover:text-red-600",
  },
  Promoções: {
    icon: DollarSign,
    color: "text-yellow-500",
    hover: "group-hover:text-yellow-500",
  },
};

export function Categories() {
  const { id, changeCategory } = useCategoryId();
  const { data: categories } = useCategories();

  useProductsToShow(id!);

  return (
    <nav className="shadow-shape flex justify-center bg-neutral-900 px-2 py-2 md:mx-auto md:mt-10 md:max-w-7xl md:rounded-full">
      <ul className="flex items-center space-x-2 sm:space-x-4 md:space-x-20">
        <li>
          <button
            className={`flex cursor-pointer items-center space-x-1 font-semibold transition duration-150 hover:text-orange-500 sm:space-x-2 ${id === "" ? "text-orange-500" : "text-white"}`}
            onClick={() => changeCategory("")}
          >
            <Package className="h-4 w-4 sm:h-6 sm:w-6 md:h-[32px] md:w-[32px]" />
            <p>Todos</p>
          </button>
        </li>
        {categories?.map((category: Category) => {
          const categoryInfo = categoryIcons[category.name];
          if (!categoryInfo) return null;

          const Icon = categoryInfo.icon;

          return (
            <li
              key={category.id}
              className="flex items-center space-x-2 text-sm"
              onClick={() => changeCategory(category.id)}
            >
              <button className="group flex cursor-pointer items-center space-x-1 md:space-x-2">
                <Icon
                  className={`h-4 w-4 transition duration-150 sm:h-6 sm:w-6 md:h-10 md:w-10 ${id === category.id ? categoryInfo.color : "text-zinc-300 md:text-white"} ${categoryInfo.hover}`}
                />
                <p
                  className={`text-sm text-nowrap transition duration-150 md:text-base ${id === category.id ? categoryInfo.color : "text-zinc-300 md:text-white"} ${categoryInfo.hover}`}
                >
                  {category.name}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
