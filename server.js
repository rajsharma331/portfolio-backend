import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import useragent from "express-useragent";

import visitRoutes from "./routes/visit.js";
import analyticsRoutes from "./routes/analytics.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(useragent.express());

app.use("/visit", visitRoutes);
app.use("/analytics", analyticsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});