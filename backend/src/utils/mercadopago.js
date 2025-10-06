import { MercadoPagoConfig, Payment } from "mercadopago";

export const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_SECRET,
  options: { timeout: 5000, idempotencyKey: "abc" },
});


