import { RestaurantSearchResponse } from "@/types/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const useSearchRestaurants = (city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurants/search/${city}`
    );

    if (!response.ok) {
      throw new Error("Error completing search");
    }

    return response.json();
  };

  const { data: searchResults, isLoading } = useQuery(
    ["searchRestaurants"],
    createSearchRequest,
    { enabled: !!city }
  );

  return { searchResults, isLoading };
};
