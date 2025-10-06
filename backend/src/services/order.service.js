import * as orderModel from "../models/order.model.js";

export async function getOrder(userId) {
  if (!userId) {
    const error = new Error("Usuário não encontrado");
    error.status = 404;
    throw error;
  }

  const result = await orderModel.findOrders(userId);
  
  return result;
}
