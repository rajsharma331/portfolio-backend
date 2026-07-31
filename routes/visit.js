import express from "express";
import { visitPortfolio } from "../controllers/visit.controller.js";

const router = express.Router();

router.post("/", visitPortfolio);

export default router;