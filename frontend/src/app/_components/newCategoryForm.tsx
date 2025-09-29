"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createCategory } from "@/services/categories";
import { DialogDescription } from "@radix-ui/react-dialog";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface DialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function NewCategoryForm({ isOpen, setIsOpen }: DialogProps) {
  const [category, setCategory] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCategory(e.target.value);
  }

  async function handleForm(e: FormEvent) {
    e.preventDefault();
    if (!category) return;
    try {
      setIsSubmitting(true);
      const response = await createCategory(category);
      toast.success(`${response.message}`);
      router.push("/admin-page")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log("Erro inesperado!", error);
      }
    } finally {
      setIsSubmitting(false);
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crie uma nova categoria</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleForm} className="space-y-3">
          <div>
            <label htmlFor="text" className="text-zinc-300">
              Nova Categoria
            </label>
            <input
              type="text"
              id="text"
              autoComplete="text"
              className="w-full rounded-sm border-2 border-zinc-400 px-2 py-3 text-zinc-400 outline-none"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center space-x-4 rounded-md bg-orange-600 py-3 text-lg font-bold transition duration-150 ease-in hover:bg-orange-500"
          >
            <p>{isSubmitting ? "Criando" : "Criar"}</p>
            <LoaderCircle
              className={`${isSubmitting ? "block animate-spin" : "hidden"}`}
            />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
