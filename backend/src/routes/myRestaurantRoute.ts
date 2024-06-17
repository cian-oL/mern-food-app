import express from "express";
import multer from "multer";

import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
import myRestaurantController from "../controllers/myRestaurantController";

const router = express.Router();

// multer settings -- 5MB limit
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

// /api/my/restaurant
router.get("/", jwtCheck, jwtParse, myRestaurantController.getMyRestaurant);

router.post(
  "/",
  upload.single("imageFile"),
  jwtCheck,
  jwtParse,
  validateMyRestaurantRequest,
  myRestaurantController.createMyRestaurant
);

export default router;
