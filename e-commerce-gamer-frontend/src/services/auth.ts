import { LoginSchema } from "@/app/types/loginSchema";
import { api } from "./api";
import { RegisterSchema } from "@/app/types/registerSchema";
import { ResetPasswordData } from "@/app/types/resetPasswordSchema";

export async function createAccount(data: RegisterSchema) {
  const res = await fetch(`${api}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res;
}

export async function signIn(data: LoginSchema) {
  const res = await fetch(`${api}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res;
}

export async function logout() {
  const res = await fetch(`${api}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return res;
}

export async function forgotPassword(email: string) {
  const res = await fetch(`${api}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function resetPassword(data: ResetPasswordData) {
  const res = await fetch(`${api}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result
}
