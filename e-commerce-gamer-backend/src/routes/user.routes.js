import { Router } from "express";
import { getMyProfileController } from "../controllers/user.controller.js";
// import { isAdmin } from "../middleware/isAdmin.js"

const router = Router();

router.get("/me", getMyProfileController);
// router.get("/me/details", getMyProfileFull);
// router.put("/me", updatedMyProfile);
// router.delete("/me", deleteProfile);
// router.delete("/me/cart", );
// router.delete("/me/cart/count", );

// router.get("/", isAdmin, getUsers);

export default router;
