import { api } from "./api";
import axios from "axios";
import { ProductInput, ProductProp } from "@/types/product";

export async function createProduct(data: ProductInput) {
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

export async function getProduct(productId: string) {
  try {
    const res = await api.get(`/products/${productId}`)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function findProduct(productId: string) {
  try {
    const res = await api.get(`/products/${productId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function searchProducts(query: string) {
  try {
    const res = await api.get(`/products?search=${query}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function productByCategory(query: string) {
  try {
    const res = await api.get(`/products?categoryId=${query}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function updateProduct({ productId, payload }: ProductProp) {
  try {
    const res = await api.put(`/products/${productId}`, payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function deleteProduct(productId: string) {
  try {
    const res = await api.delete(`/products/${productId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}
