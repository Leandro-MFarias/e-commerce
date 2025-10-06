import { Router } from "express";
import { checkoutController } from "../controllers/checkout.controller.js";

const router = Router();

router.post("/", checkoutController);

export default router;