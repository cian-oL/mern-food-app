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

    const newRestaurant = new Restaurant(req.body);
    newRestaurant.imageUrl = await uploadImage(req.file as Express.Multer.File);
    newRestaurant.user = new mongoose.Types.ObjectId(req.userId);
    newRestaurant.lastUpdated = new Date();
    await newRestaurant.save();

    res.status(201).json(newRestaurant.toObject());
  } catch (err) {
    console.error(err);
    res.send(500).json({ message: "Something went wrong" });
  }
};

const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      city,
      country,
      deliveryPrice,
      estimatedDeliveryTime,
      cuisines,
      menuItems,
    } = req.body;
    const currentRestaurant = await Restaurant.findOne({ user: req.userId });

    if (!currentRestaurant) {
      return res.status(404).json({ message: "No restaurant found" });
    }

    currentRestaurant.restaurantName = restaurantName;
    currentRestaurant.city = city;
    currentRestaurant.country = country;
    currentRestaurant.deliveryPrice = deliveryPrice;
    currentRestaurant.estimatedDeliveryTime = estimatedDeliveryTime;
    currentRestaurant.cuisines = cuisines;
    currentRestaurant.menuItems = menuItems;
    currentRestaurant.lastUpdated = new Date();

    if (req.file) {
      currentRestaurant.imageUrl = await uploadImage(
        req.file as Express.Multer.File
      );
    }

    await currentRestaurant.save();
    return res.status(200).json(currentRestaurant.toObject());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const imageFile = file;
  const base64Image = Buffer.from(imageFile.buffer).toString("base64");
  const dataUri = `data:${imageFile.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.uploader.upload(dataUri);

  return uploadResponse.url;
};

export default { getMyRestaurant, createMyRestaurant, updateMyRestaurant };
