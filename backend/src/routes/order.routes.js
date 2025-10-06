import { Router } from "express";
import { getOrderController } from "../controllers/order.controller.js";

const router = Router()

router.get("/", getOrderController)

export default router