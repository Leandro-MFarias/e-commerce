import { api } from "./api";

export async function fetchProducts() {
  const res = await fetch(`${api}/products`, {
    method: "GET",
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result
}
