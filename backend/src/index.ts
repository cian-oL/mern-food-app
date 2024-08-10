import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import myUserRoute from "./routes/myUserRoute";
import myRestaurantRoute from "./routes/myRestaurantRoute";
import restaurantRoute from "./routes/restaurantRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database"));
const PORT = 6789;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// health endpoint -- extra sanity checck to confirm we can access our endpoints
app.use("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK" });
});

// user endpoints
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurants", restaurantRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
