"use client";

import { EditProduct } from "@/app/_components/editProduct";
import { SideBar } from "@/app/_components/sidebar";
import { useCategories } from "@/hooks/categories";
import { useFindProduct } from "@/hooks/product";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const { data: product, isLoading: productLoading } = useFindProduct(
    params.id,
  );
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const isLoading = productLoading || categoriesLoading;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" size={60} />
      </div>
    );
  }

  return (
    <div className="flex md:h-screen">
      <SideBar />
      <div className="flex w-full px-14 md:h-screen md:items-center">
        <EditProduct product={product} categories={categories} />
      </div>
    </div>
  );
}