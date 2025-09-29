import { LoginSchema } from "@/types/loginSchema";
import { api } from "./api";
import { RegisterSchema } from "@/types/registerSchema";
import { ResetPasswordData } from "@/types/resetPasswordSchema";

export async function createAccount(data: RegisterSchema) {
  const res = await fetch(`${api}/auth/register`, {
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
  const res = await fetch(`${api}/auth/login`, {
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
  const res = await fetch(`${api}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return res;
}

export async function forgotPassword(email: string) {
  const res = await fetch(`${api}/auth/forgot-password`, {
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
  const res = await fetch(`${api}/auth/reset-password`, {
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

  return result;
}
