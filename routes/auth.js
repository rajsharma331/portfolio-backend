import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  registerAdmin,
  loginAdmin,
  changePassword,
} from "../controllers/auth.controller.js";


const router = express.Router();


router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.post(
  "/change-password",
  authMiddleware,
  changePassword
);
export default router;