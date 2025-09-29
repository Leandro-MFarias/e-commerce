import { Router } from "express";
import { auth } from "../middleware/auth.js";
import authRoutes from "./auth.routes.js"
import usersRoutes from "./user.routes.js"
import productsRoutes from "./product.routes.js"
import categoriesRoutes from "./category.routes.js"

const router = Router()

router.use("/auth", authRoutes)
router.use("/users", auth, usersRoutes)
router.use("/products", productsRoutes)
router.use("/categories", categoriesRoutes)

export default router