import axios from "axios";
import { api } from "./api";

export async function getUser() {
  try {
    const res = await api.get("/users/me");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}
