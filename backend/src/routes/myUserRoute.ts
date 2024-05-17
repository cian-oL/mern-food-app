import express, { Request, Response } from "express";

import myUserController from "../controllers/myUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

// /api/my/user
router.post("/", jwtCheck, myUserController.createCurrentUser);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  myUserController.updateCurrentUser
);

export default router;
