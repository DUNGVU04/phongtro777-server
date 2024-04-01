import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import * as controllers from "../controllers/user.js";

const router = express.Router();
router.use(verifyToken);
router.get("/get-current", controllers.getCurrent);
router.put("/", controllers.updateUser);
export default router;
