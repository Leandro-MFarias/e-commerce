import axios from "axios";
import { api } from "./api";

export async function getCartItems() {
  try {
    const res = await api.get("/cart/");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function addToCart(productId: string) {
  try {
    const res = await api.post("/cart/", { productId });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function updateCartItem(cartItemId: string, quantity: number) {
  try {
    const res = await api.patch(`/cart/${cartItemId}`, { quantity });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function deleteToCart(cartItemId: string) {
  try {
    const res = await api.delete(`/cart/${cartItemId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}
