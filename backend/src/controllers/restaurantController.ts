import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    // 10 results per page
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    let query: any = {};
    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);

    // match emptny data response for consistency
    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      const cuisinesRegExArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesRegExArray }; // syntax for array
    }

    // search query for text matching the restaurant name or check any cuisines provided by restaurant
    if (searchQuery) {
      const searchRegEx = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegEx },
        { cuisines: { $in: [searchRegEx] } },
      ];
    }

    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean(); // strip out all mongoose metadata and make simple JSON obj

    const total = await Restaurant.countDocuments(query);

    // return pagination and the response for frontend
    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.send(500).json({ message: "Something went wrong" });
  }
};

export default { searchRestaurants };
