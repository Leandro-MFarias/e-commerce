import { ProductSchema } from "@/app/types/productSchema";
import { api } from "./api";

export async function createProduct(data: ProductSchema) {
  const res = await fetch(`${api}/new-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data)
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result
}