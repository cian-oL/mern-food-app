import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import myUserRoute from "./routes/myUserRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database"));
const PORT = 6789;

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
