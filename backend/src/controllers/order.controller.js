import * as orderService from "../services/order.service.js";

export async function getOrderController(req, res) {
  try {
    const result = await orderService.getOrder(req.userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.status });
  }
}
