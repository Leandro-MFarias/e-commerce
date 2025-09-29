"use client";

import { ForgotPassword } from "@/app/_components/forgotPassword";
import { LoginSchema, loginSchema } from "@/types/loginSchema";
import { signIn } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeft,
  Eye,
  EyeOff,
  LoaderCircle,
  SquareArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function handleForm(data: LoginSchema) {
    try {
      const response = await signIn(data);
      const result = await response.json();
      if (!response.ok) {
        if (result.message.includes("Usuário")) {
          setError("email", { message: result.message });
        } else if (result.message.includes("Senha")) {
          setError("password", { message: result.message });
        }
        return;
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
            ACESSE SUA CONTA
          </h2>

          <form
            onSubmit={handleSubmit(handleForm)}
            className="w-[80%] space-y-5 rounded-md p-4"
          >
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="email" className="text-zinc-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                {...register("email")}
                className="w-full rounded-sm border-2 border-zinc-400 px-2 py-3 text-zinc-400 outline-none"
              />
              <p className="h-5 font-bold text-red-500/80">
                {errors.email?.message}
              </p>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="password" className="text-zinc-300">
                Senha
              </label>
              <div className="relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  autoComplete="current-password"
                  {...register("password")}
                  className="w-full rounded-sm border-2 border-zinc-400 px-2 py-3 text-zinc-400 outline-none"
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

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="cursor-pointer text-end text-sm font-semibold text-zinc-300 hover:text-white"
            >
              Esqueceu sua senha?
            </button>
          </form>

          {/* LINHAS */}
          <div className="flex w-[80%] items-center space-x-2">
            <div className="h-[1px] w-full bg-zinc-600" />
            <span className="text-zinc-400">OU</span>
            <div className="h-[1px] w-full bg-zinc-600" />
          </div>

          {/* GOOGLE */}
          <div className="flex w-[75%] flex-col items-center space-y-5">
            <button className="w-full rounded-sm border border-red-600/90 py-3 text-xl text-red-600/90">
              Google
            </button>
            <div className="flex space-x-2">
              <p className="text-zinc-300">Novo na Reload Store!</p>
              <Link href={"/register"}>
                <span className="font-bold text-orange-500">CADASTRE-SE</span>
              </Link>
            </div>
          </div>
        </div>

        <footer></footer>
      </div>
      <ForgotPassword isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
