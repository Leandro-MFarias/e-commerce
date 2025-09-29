import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
} from "../controllers/category.controller.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", getCategoriesController);
router.post("/", auth, isAdmin, createCategoryController);
router.delete("/:id", auth, isAdmin, deleteCategoryController);

export default router;
