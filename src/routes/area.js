import express from "express";
import * as controllers from "../controllers/area.js";

const router = express.Router();

router.get("/all", controllers.getAreas);

export default router;
