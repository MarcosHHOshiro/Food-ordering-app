import type { SearchState } from "@/pages/SearchPage";
import type { Restaurant, RestaurantSearchResponse } from "@/types/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7000";

export const useGetRestaurant = (restaurantId?: string) => {
    const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
        const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);

        if (!restaurantId) {
            throw new Error("Restaurant ID is required");
        }

        return response.json();
    }

    const { data: restaurant, isLoading } = useQuery(
        "fetchRestaurant",
        getRestaurantByIdRequest,
        {
            enabled: !!restaurantId,
        }
    );

    return { restaurant, isLoading };
}

export const useSearchRestaurants = (searchState: SearchState, city?: string) => {
    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
        const params = new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery);
        params.set("page", searchState.page.toString());
        params.set("selectedCuisines", searchState.selectedCuisines.join(","));
        params.set("sortOption", searchState.sortOption);

        const response = await fetch(
            `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`,
        );

        if (!response.ok) {
            throw new Error("Failed to search restaurants");
        }

        return response.json();
    }

    const { data: results, isLoading } = useQuery(
        ['searchRestaurants', searchState],
        createSearchRequest,
        { enabled: !!city, }
    );

    return { results, isLoading };
}