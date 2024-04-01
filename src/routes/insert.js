import express from "express";
import * as insertController from "../controllers/insert.js";

const router = express.Router();
router.post("/", insertController.insert);

export default router;
