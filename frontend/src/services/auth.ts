import { LoginSchema } from "@/types/loginSchema";
import { api } from "./api";
import { RegisterSchema } from "@/types/registerSchema";
import { ResetPasswordData } from "@/types/resetPasswordSchema";
import axios from "axios";

export async function createAccount(data: RegisterSchema) {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function signIn(data: LoginSchema) {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function logout() {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function forgotPassword(email: string) {
  try {
    const res = await api.post("/auth/forgot-password", email);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function resetPassword(data: ResetPasswordData) {
  try {
    const res = await api.post("/auth/reset-password", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}
