"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Product } from "@/types/product";
import { SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDeleteProduct } from "../../../hooks/product";
import { toast } from "sonner";
import axios from "axios";

export function ActionsProductCell({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: deleteItem } = useDeleteProduct();
  const router = useRouter();

  function handleEdit() {
    router.push(`/dashboard/edit-product/${product.id}`);
  }

  async function handleDelete() {
    try {
      if (!product.id) return;
      const response = await deleteItem(product.id);
      toast.success(response.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleEdit}
          className="text-muted-foreground cursor-pointer hover:scale-105"
        >
          <SquarePen size={16} />
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer text-red-500 transition hover:scale-105"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
