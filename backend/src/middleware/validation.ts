import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name is required and must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 is required and must be a string)"),
  body("city")
    .isString()
    .notEmpty()
    .withMessage("City is required and must be a string"),
  body("country")
    .isString()
    .notEmpty()
    .withMessage("Country is required and must be a string"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName")
    .isString()
    .notEmpty()
    .withMessage("Name must be a string"),
  body("city")
    .isString()
    .notEmpty()
    .withMessage("City is required and must be a string"),
  body("country")
    .isString()
    .notEmpty()
    .withMessage("Country is required and must be a string"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery Price must be a positive float"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated Delivery Time must be a positive integer"),
  body("cuisines")
    .isArray()
    .notEmpty()
    .withMessage("Cuisines must be an array and not empty"),
  body("menuItems")
    .isArray()
    .withMessage("Menu Items must be an array and not empty"),
  body("menuItems.*.name")
    .isString()
    .notEmpty()
    .withMessage("Menu Item Name is required and must be a string"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu Item Price is required and must be a positive float"),
  handleValidationErrors,
];
