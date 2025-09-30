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

export function ActionsProductCell({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleEdit() {
    router.push(`/admin-page/edit-product/${product.id}`);
  }

  function handleDelete() {}

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
