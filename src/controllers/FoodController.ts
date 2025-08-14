import { Request, Response } from 'express';
import Food from '../models/Food';
import { FoodFilters, ApiResponse } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class FoodController {
  static async getAllFoods(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = 1,
        limit = 20,
        category,
        restaurant,
        minPrice,
        maxPrice,
        isVegetarian,
        isVegan,
        isGlutenFree,
        spiceLevel,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query as FoodFilters;

      const skip = (Number(page) - 1) * Number(limit);
      const query: any = {};

      // Build filter query
      if (category) query.category = category;
      if (restaurant) query.restaurant = restaurant;
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
      if (isVegetarian === 'true') query.isVegetarian = true;
      if (isVegan === 'true') query.isVegan = true;
      if (isGlutenFree === 'true') query.isGlutenFree = true;
      if (spiceLevel) query.spiceLevel = spiceLevel;
      if (search) {
        query.$text = { $search: search };
      }

      // Only show available items
      query.availability = true;

      const sortOptions: any = {};
      sortOptions[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

      const foods = await Food.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit))
        .lean();

      const total = await Food.countDocuments(query);
      const pages = Math.ceil(total / Number(limit));

      const response: ApiResponse = {
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
    } catch (error) {
      console.error('Get all foods error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to retrieve foods',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }

  static async getFoodById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const food = await Food.findOne({ id }).lean();

      if (!food) {
        const response: ApiResponse = {
          success: false,
          message: 'Food item not found'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Food item retrieved successfully',
        data: food
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get food by ID error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to retrieve food item',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }

  static async createFood(req: Request, res: Response): Promise<void> {
    try {
      const foodData = {
        ...req.body,
        id: uuidv4(),
      };

      const food = new Food(foodData);
      await food.save();

      const response: ApiResponse = {
        success: true,
        message: 'Food item created successfully',
        data: food
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Create food error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to create food item',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }

  static async updateFood(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const food = await Food.findOneAndUpdate(
        { id },
        updateData,
        { new: true, runValidators: true }
      ).lean();

      if (!food) {
        const response: ApiResponse = {
          success: false,
          message: 'Food item not found'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Food item updated successfully',
        data: food
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Update food error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to update food item',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }

  static async deleteFood(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const food = await Food.findOneAndDelete({ id });

      if (!food) {
        const response: ApiResponse = {
          success: false,
          message: 'Food item not found'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Food item deleted successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Delete food error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to delete food item',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }

  static async getFoodCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await Food.distinct('category');
      
      const response: ApiResponse = {
        success: true,
        message: 'Food categories retrieved successfully',
        data: categories
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get food categories error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to retrieve food categories',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }

  static async searchFoods(req: Request, res: Response): Promise<void> {
    try {
      const { q, limit = 10 } = req.query;

      if (!q || typeof q !== 'string') {
        const response: ApiResponse = {
          success: false,
          message: 'Search query is required'
        };
        res.status(400).json(response);
        return;
      }

      const foods = await Food.find({
        $text: { $search: q },
        availability: true
      })
      .limit(Number(limit))
      .lean();

      const response: ApiResponse = {
        success: true,
        message: 'Search completed successfully',
        data: foods
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Search foods error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to search foods',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }
}