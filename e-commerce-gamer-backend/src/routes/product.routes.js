import { Router } from "express";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  craeteProductController,
  deleteProductController,
  getProductController,
  getProductsController,
  updateProductController,
} from "../controllers/product.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", getProductsController);
router.get("/:id", getProductController);

router.post("/", auth, isAdmin, craeteProductController);
router.put("/:id", auth, isAdmin, updateProductController);
router.delete("/:id", auth, isAdmin, deleteProductController);

export default router;
