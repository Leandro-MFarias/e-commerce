import { api } from "./api";

export async function getCategories() {
  const res = await fetch(`${api}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result
}