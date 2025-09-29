import { ProductSchema } from "@/types/productSchema";
import { api } from "./api";

export async function createProduct(data: ProductSchema) {
  const res = await fetch(`${api}/products/`, {
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

export async function fetchProducts() {
  const res = await fetch(`${api}/products/`, {
    method: "GET",
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result;
}
