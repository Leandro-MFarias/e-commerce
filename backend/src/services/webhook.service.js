import * as webhookModel from "../models/webhook.model.js";
import axios from "axios";

export async function handleMercadoPago(data) {
  if (data.type !== "payment") {
    return { message: "Evento ignorado: não é um pagamento" };
  }

  const paymentId = data.data.id;

  const response = await axios.get(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_SECRET}`,
      },
    }
  );

  const paymentInfo = response.data;

  const { status, metadata } = paymentInfo;
  const userId = metadata?.userId;
  const orderId = metadata?.orderId;

  if (!userId || !orderId) {
    throw new Error("Metadados do pagamento inválidos");
  }

  await webhookModel.updateOrderStatus(orderId, status);

  return { message: "Webhook processado com sucesso!" };
}
