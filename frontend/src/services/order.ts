import axios from "axios";
import { api } from "./api";

export async function getOrders() {
  try {
    const res = await api.get("/orders/");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}
