import { api } from "./api"

export async function userInfo() {
  const res = await fetch(`${api}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  return res.json()
}