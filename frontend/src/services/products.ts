import { ProductSchema } from "@/types/productSchema";
import { api } from "./api";
import axios from "axios";

export async function createProduct(data: ProductSchema) {
  try {
    const res = await api.post("/products/", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function fetchProducts() {
  try {
    const res = await api.get("/products/");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}
