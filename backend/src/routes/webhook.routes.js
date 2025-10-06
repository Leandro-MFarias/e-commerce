import { Router } from "express";
import { mercadopagoWebhookController } from "../controllers/webhook.controller.js";

const router = Router()

router.post("/mercadopago", mercadopagoWebhookController)

export default router