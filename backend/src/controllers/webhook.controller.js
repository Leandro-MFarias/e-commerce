import * as webhookService from "../services/webhook.service.js";

export async function mercadopagoWebhookController(req, res) {
  try {
    const result = await webhookService.handleMercadoPago(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(error.status || 500).json({ message: error.message });
  }
}
