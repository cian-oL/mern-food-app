import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

import Restaurant from "../models/restaurant";

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const currentRestaurant = await Restaurant.findOne({ user: req.userId });

    if (!currentRestaurant) {
      return res.status(404).json({ message: "No restaurant found" });
    }
    res.status(200).json(currentRestaurant.toObject());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({
      user: req.userId,
      restaurantName: req.body.restaurantName,
    });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    const imageFile = req.file as Express.Multer.File;
    const base64Image = Buffer.from(imageFile.buffer).toString("base64");
    const dataUri = `data:${imageFile.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.uploader.upload(dataUri);

    const newRestaurant = new Restaurant(req.body);
    newRestaurant.imageUrl = uploadResponse.url;
    newRestaurant.user = new mongoose.Types.ObjectId(req.userId);
    newRestaurant.lastUpdated = new Date();
    await newRestaurant.save();

    res.status(201).json(newRestaurant.toObject());
  } catch (err) {
    console.error(err);
    res.send(500).json({ message: "Something went wrong" });
  }
};

export default { getMyRestaurant, createMyRestaurant };
