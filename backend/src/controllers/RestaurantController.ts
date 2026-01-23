import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';
import { console } from 'inspector/promises';

const getRestaurant = async (req: Request, res: Response) => {
    try {
        const { restaurantId } = req.params;

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).send({ message: "Restaurant not found" });
        }

        res.json(restaurant);
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const searchRestaurants = async (req: Request, res: Response) => {
    try {
        const city = req.params.city as string;

        const searchQuery = (req.query.searchQuery as string) || '';
        const selectedCuisines = (req.query.selectedCuisines as string) || '';
        const sortOption = req.query.sortOption as string || 'lastUpdate';
        const page = parseInt(req.query.page as string) || 1;

        let query: any = {};
        const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // match city (escape to avoid regex syntax issues)
        query['city'] = new RegExp(escapeRegex(city), 'i');

        if (selectedCuisines) {
            const cuisinesArray = selectedCuisines.split(',').map((cuisine) => new RegExp(escapeRegex(cuisine), 'i'));
            query['cuisines'] = { $all: cuisinesArray };
        }

        if (searchQuery) {
            const searchRegex = new RegExp(escapeRegex(searchQuery), 'i');
            query['$or'] = [
                { restaurantName: searchRegex },
                { cuisines: { $in: [searchRegex] } },
            ];
        }

        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const restaurants = await Restaurant.find(query)
            .sort({ [sortOption]: 1 })
            .skip(skip)
            .limit(pageSize)
            .lean();

        const total = await Restaurant.countDocuments(query);

        const response = {
            data: restaurants,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.send(response);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

export default {
    searchRestaurants,
    getRestaurant
};