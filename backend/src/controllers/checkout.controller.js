import * as checkoutService from "../services/checkout.service.js";

export async function checkoutController(req, res) {
  try {
    const result = await checkoutService.checkout(req.userId);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}
