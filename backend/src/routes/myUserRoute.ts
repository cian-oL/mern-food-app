import express, { Request, Response } from "express";

import myUserController from "../controllers/myUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

// /api/my/user
router.post("/", jwtCheck, myUserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, myUserController.updateCurrentUser);

export default router;
