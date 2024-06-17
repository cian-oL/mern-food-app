import express from "express";
import multer from "multer";

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
router.post(
  "/",
  upload.single("imageFile"),
  myRestaurantController.createMyRestaurant
);

export default router;
