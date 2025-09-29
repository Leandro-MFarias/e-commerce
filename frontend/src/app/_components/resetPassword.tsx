"use client";

import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/types/resetPasswordSchema";
import { resetPassword } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeft,
  Eye,
  EyeOff,
  LoaderCircle,
  SquareArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function handleForm(formData: ResetPasswordSchema) {
    if (!email || !token) {
      return console.error("Token ou email inválidos.");
    }

    try {
      const data = { email, token, password: formData.password };
      const result = await resetPassword(data);
      toast.success(`${result.message}`);
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log("Erro inesperado!", error);
      }
    }
  }

  return (
    <div className="h-screen space-y-12">
      {/* HEADER */}
      <header className="flex items-center border-b-2 border-orange-500 px-4 py-6 lg:px-14">
        <Link href={"/"}>
          <h1 className="hidden text-4xl font-bold text-orange-500 lg:block">
            Reload Store
          </h1>
          <p className="flex space-x-1 transition duration-150 ease-in hover:text-orange-500 lg:hidden">
            <ChevronLeft /> <span>Voltar</span>
          </p>
        </Link>
      </header>

      <div className="mx-auto flex flex-col items-center justify-center space-y-5 md:max-w-3xl">
        <h2 className="text-xl font-bold tracking-wider text-orange-500">
          RECUPERAR SUA SENHA
        </h2>

        <form
          onSubmit={handleSubmit(handleForm)}
          className="w-[80%] space-y-5 rounded-md p-4"
        >
          <div className="flex w-full flex-col space-y-1.5">
            <label htmlFor="password" className="text-zinc-300">
              Senha
            </label>
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                {...register("password")}
                className="w-full rounded-sm border-2 border-zinc-400 px-2 py-3 pr-10 text-zinc-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-4"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <p className="h-5 font-bold text-red-500/80">
              {errors.password?.message}
            </p>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex w-full flex-col space-y-1.5">
            <label htmlFor="confirm" className="text-zinc-300">
              Confirme sua Senha
            </label>
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                id="confirm"
                {...register("confirm")}
                className="w-full rounded-sm border-2 border-zinc-400 px-2 py-3 pr-10 text-zinc-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-4"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <p className="h-5 font-bold text-red-500/80">
              {errors.confirm?.message}
            </p>
          </div>

          {/* BUTTON SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex w-full cursor-pointer items-center justify-center space-x-2 rounded-sm bg-orange-600 py-4 transition duration-150 ease-in hover:bg-orange-500"
          >
            <span className="font-semibold">
              {isSubmitting ? "ENTRANDO" : "ENTRAR"}
            </span>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <SquareArrowRight className="transition duration-200 ease-in group-hover:translate-x-1" />
            )}
          </button>
        </form>
      </div>

      <footer></footer>
    </div>
  );
}
