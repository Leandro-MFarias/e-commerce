import axios from "axios";
import { api } from "./api";

export async function getCategories() {
  try {
    const res = await api.get("/categories/");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function createCategory(category: string) {
  try {
    const res = await api.post("/categories/", category);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}
