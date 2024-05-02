import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const PORT = 6789;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Sucessful test request" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
