"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { forgotPassword } from "@/services/auth";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

interface ResetPasswordProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function ForgotPassword({ isOpen, setIsOpen }: ResetPasswordProps) {
  const [email, setEmail] = useState<string>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function handleForm(e: FormEvent) {
    e.preventDefault();
    if (!email) return 
    
    try {
      const result = await forgotPassword(email);
      toast.success(`${result.message}`);
      setIsOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log("Erro inesperado", error);
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Esquece a senha</DialogTitle>
          <DialogDescription>
            Coloque seu email para trocar a sua senha.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleForm} className="space-y-3">
          <div>
            <label htmlFor="email" className="text-zinc-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              className="w-full rounded-sm border-2 border-zinc-400 px-2 py-3 text-zinc-400 outline-none"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-orange-600 py-2 transition duration-150 ease-in hover:bg-orange-500"
          >
            Enviar
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
