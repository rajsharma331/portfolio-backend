import express from "express";

import {
 getAnalytics,
 getDailyVisitors
} from "../controllers/analytics.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();


router.get(
  "/stats",
  authMiddleware,
  getAnalytics
);


router.get(
  "/daily",
  authMiddleware,
  getDailyVisitors
);


export default router;