import { Preference } from "mercadopago";
import * as checkoutModel from "../models/checkout.model.js";
import { client } from "../utils/mercadopago.js";

export async function checkout(userId) {
  if (!userId) {
    const error = new Error("Usuário não encontrado");
    error.status = 404;
    throw error;
  }

  const cartItems = await checkoutModel.findItems(userId);

  if (!cartItems || cartItems.length === 0) {
    const error = new Error("Carrinho vazio");
    error.status = 400;
    throw error;
  }

  const items = cartItems.map((item) => ({
    title: String(item.product.name),
    unit_price: Number(item.product.price) / 100,
    quantity: Number(item.quantity),
    currency_id: "BRL",
    picture_url: String(item.product.imageUrl || ""),
  }));

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + Number(item.product.price) * Number(item.quantity),
    0
  );

  const order = await checkoutModel.addOrder(userId, cartItems, totalAmount);

  const preference = new Preference(client);

  try {
    const body = {
      items,
      payer: {
        name: "Fulano Silva",
        email: "test_user_123@test.com",
        identification: {
          type: "CPF",
          number: "12345678909", // CPF de teste (ver abaixo)
        },
        phone: {
          area_code: "11",
          number: "999999999",
        },
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/success`,
        failure: `${process.env.FRONTEND_URL}/failure`,
        pending: `${process.env.FRONTEND_URL}/pending`,
      },
      auto_return: "approved",
      notification_url: `${process.env.BACKEND_URL}/api/webhook/mercadopago`,
      metadata: { userId: String(userId), orderId: String(order.id) },
    };

    const result = await preference.create({ body });

    return {
      checkoutUrl: result.init_point,
      orderId: order.id,
    };
  } catch (error) {
    console.error("❌ Mercado Pago error:", error);
    if (error.cause) {
      console.error("Causa detalhada:", error.cause);
    }
    throw error;
  }
}
