import { Router } from "express";
import { auth } from "../middleware/auth.js";
import authRoutes from "./auth.routes.js";
import usersRoutes from "./user.routes.js";
import productsRoutes from "./product.routes.js";
import categoriesRoutes from "./category.routes.js";
import cartRoutes from "./cart.routes.js";
import checkoutRoutes from "./checkout.routes.js";
import webhookRoutes from "./webhook.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", auth, usersRoutes);
router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/cart", auth, cartRoutes);
router.use("/checkout", auth, checkoutRoutes);
router.use("/webhook", webhookRoutes);

export default router;