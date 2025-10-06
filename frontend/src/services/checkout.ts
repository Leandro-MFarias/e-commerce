import { api } from "./api";

interface CheckoutResponse {
  checkoutUrl: string;
  orderId: string;
}

export async function createCheckout(): Promise<CheckoutResponse> {
  const { data } = await api.post("/checkout/");
  return data;
}
