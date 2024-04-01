import express from "express";
import * as controllers from "../controllers/price.js";

const router = express.Router();

router.get("/all", controllers.getPrices);

export default router;
