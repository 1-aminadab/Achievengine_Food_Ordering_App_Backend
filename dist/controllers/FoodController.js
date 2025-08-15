"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodController = void 0;
const Food_1 = __importDefault(require("../models/Food"));
const uuid_1 = require("uuid");
class FoodController {
    static async getAllFoods(req, res) {
        try {
            const { page = 1, limit = 20, category, restaurant, minPrice, maxPrice, isVegetarian, isVegan, isGlutenFree, spiceLevel, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
            const skip = (Number(page) - 1) * Number(limit);
            const query = {};
            if (category)
                query.category = category;
            if (restaurant)
                query.restaurant = restaurant;
            if (minPrice || maxPrice) {
                query.price = {};
                if (minPrice)
                    query.price.$gte = Number(minPrice);
                if (maxPrice)
                    query.price.$lte = Number(maxPrice);
            }
            if (isVegetarian === 'true')
                query.isVegetarian = true;
            if (isVegan === 'true')
                query.isVegan = true;
            if (isGlutenFree === 'true')
                query.isGlutenFree = true;
            if (spiceLevel)
                query.spiceLevel = spiceLevel;
            if (search) {
                query.$text = { $search: search };
            }
            query.availability = true;
            const sortOptions = {};
            sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
            const foods = await Food_1.default.find(query)
                .sort(sortOptions)
                .skip(skip)
                .limit(Number(limit))
                .lean();
            const total = await Food_1.default.countDocuments(query);
            const pages = Math.ceil(total / Number(limit));
            const response = {
                success: true,
                message: 'Foods retrieved successfully',
                data: foods,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages
                }
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error('Get all foods error:', error);
            const response = {
                success: false,
                message: 'Failed to retrieve foods',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }
    static async getFoodById(req, res) {
        try {
            const { id } = req.params;
            const food = await Food_1.default.findOne({ id }).lean();
            if (!food) {
                const response = {
                    success: false,
                    message: 'Food item not found'
                };
                res.status(404).json(response);
                return;
            }
            const response = {
                success: true,
                message: 'Food item retrieved successfully',
                data: food
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error('Get food by ID error:', error);
            const response = {
                success: false,
                message: 'Failed to retrieve food item',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }
    static async createFood(req, res) {
        try {
            const foodData = {
                ...req.body,
                id: (0, uuid_1.v4)(),
            };
            const food = new Food_1.default(foodData);
            await food.save();
            const response = {
                success: true,
                message: 'Food item created successfully',
                data: food
            };
            res.status(201).json(response);
        }
        catch (error) {
            console.error('Create food error:', error);
            const response = {
                success: false,
                message: 'Failed to create food item',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }
    static async updateFood(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const food = await Food_1.default.findOneAndUpdate({ id }, updateData, { new: true, runValidators: true }).lean();
            if (!food) {
                const response = {
                    success: false,
                    message: 'Food item not found'
                };
                res.status(404).json(response);
                return;
            }
            const response = {
                success: true,
                message: 'Food item updated successfully',
                data: food
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error('Update food error:', error);
            const response = {
                success: false,
                message: 'Failed to update food item',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }
    static async deleteFood(req, res) {
        try {
            const { id } = req.params;
            const food = await Food_1.default.findOneAndDelete({ id });
            if (!food) {
                const response = {
                    success: false,
                    message: 'Food item not found'
                };
                res.status(404).json(response);
                return;
            }
            const response = {
                success: true,
                message: 'Food item deleted successfully'
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error('Delete food error:', error);
            const response = {
                success: false,
                message: 'Failed to delete food item',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }
    static async getFoodCategories(req, res) {
        try {
            const categories = await Food_1.default.distinct('category');
            const response = {
                success: true,
                message: 'Food categories retrieved successfully',
                data: categories
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error('Get food categories error:', error);
            const response = {
                success: false,
                message: 'Failed to retrieve food categories',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }
    static async searchFoods(req, res) {
        try {
            const { q, limit = 10 } = req.query;
            if (!q || typeof q !== 'string') {
                const response = {
                    success: false,
                    message: 'Search query is required'
                };
                res.status(400).json(response);
                return;
            }
            const foods = await Food_1.default.find({
                $text: { $search: q },
                availability: true
            })
                .limit(Number(limit))
                .lean();
            const response = {
                success: true,
                message: 'Search completed successfully',
                data: foods
            };
            res.status(200).json(response);
        }
        catch (error) {
            console.error('Search foods error:', error);
            const response = {
                success: false,
                message: 'Failed to search foods',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
            res.status(500).json(response);
        }
    }
}
exports.FoodController = FoodController;
//# sourceMappingURL=FoodController.js.map