import { Router } from "express";
import {
  addToCartController,
  deleteCartItemController,
  getCartItemsController,
  updateCartItemController,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/", getCartItemsController);
router.post("/", addToCartController);
router.patch("/:id", updateCartItemController);
router.delete("/:id", deleteCartItemController);

export default router;
