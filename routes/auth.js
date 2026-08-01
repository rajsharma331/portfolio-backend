import express from "express";
import {
  registerAdmin,
  loginAdmin,
  changePassword,
  updateAdmin,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";



const router = express.Router();


router.post("/register", registerAdmin);
router.put(
  "/update",
  authMiddleware,
  updateAdmin
);

router.post("/login", loginAdmin);

router.post(
  "/change-password",
  authMiddleware,
  changePassword
);
export default router;