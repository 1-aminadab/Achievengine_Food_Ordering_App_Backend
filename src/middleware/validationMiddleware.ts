import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ApiResponse } from '../types';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const response: ApiResponse = {
        success: false,
        message: 'Validation error',
        error: error.details[0]?.message || 'Invalid data provided'
      };
      res.status(400).json(response);
      return;
    }
    
    next();
  };
};

// Food validation schemas
export const createFoodSchema = Joi.object({
  name: Joi.string().required().trim().min(2).max(100),
  description: Joi.string().required().min(10).max(500),
  price: Joi.number().required().min(0),
  availability: Joi.boolean().default(true),
  deliveryTime: Joi.string().required(),
  imageUrl: Joi.string().uri().required(),
  quantity: Joi.number().min(0).default(50),
  category: Joi.string().required().valid('appetizer', 'main', 'dessert', 'beverage', 'snack', 'pizza', 'burger', 'pasta', 'salad', 'soup'),
  restaurant: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string()),
  nutritionalInfo: Joi.object({
    calories: Joi.number().min(0),
    protein: Joi.number().min(0),
    carbs: Joi.number().min(0),
    fat: Joi.number().min(0),
  }),
  spiceLevel: Joi.string().valid('Mild', 'Medium', 'Hot', 'Very Hot').default('Medium'),
  isVegetarian: Joi.boolean().default(false),
  isVegan: Joi.boolean().default(false),
  isGlutenFree: Joi.boolean().default(false),
});

export const updateFoodSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  description: Joi.string().min(10).max(500),
  price: Joi.number().min(0),
  availability: Joi.boolean(),
  deliveryTime: Joi.string(),
  imageUrl: Joi.string().uri(),
  quantity: Joi.number().min(0),
  category: Joi.string().valid('appetizer', 'main', 'dessert', 'beverage', 'snack', 'pizza', 'burger', 'pasta', 'salad', 'soup'),
  restaurant: Joi.string(),
  ingredients: Joi.array().items(Joi.string()),
  nutritionalInfo: Joi.object({
    calories: Joi.number().min(0),
    protein: Joi.number().min(0),
    carbs: Joi.number().min(0),
    fat: Joi.number().min(0),
  }),
  spiceLevel: Joi.string().valid('Mild', 'Medium', 'Hot', 'Very Hot'),
  isVegetarian: Joi.boolean(),
  isVegan: Joi.boolean(),
  isGlutenFree: Joi.boolean(),
});

// Order validation schemas
export const createOrderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number().min(0).required(),
      imageUrl: Joi.string().uri().required(),
      quantity: Joi.number().min(1).required(),
      specialRequest: Joi.string().allow(''),
      requiresCutlery: Joi.boolean().default(false),
      customizations: Joi.object({
        spiceLevel: Joi.string(),
        extraCheese: Joi.boolean(),
        extraSauce: Joi.boolean(),
        noOnions: Joi.boolean(),
        specialRequest: Joi.string().allow(''),
      }),
    })
  ).min(1).required(),
  totalPrice: Joi.number().min(0).required(),
  deliveryFee: Joi.number().min(0).default(0),
  deliveryType: Joi.string().valid('delivery', 'pickup').required(),
  deliveryAddress: Joi.when('deliveryType', {
    is: 'delivery',
    then: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required(),
      coordinates: Joi.object({
        latitude: Joi.number(),
        longitude: Joi.number(),
      }),
    }).required(),
    otherwise: Joi.optional(),
  }),
  paymentMethod: Joi.string().valid('cash', 'card', 'mobile').required(),
  cutleryCount: Joi.number().min(0).default(0),
  promoCode: Joi.string().allow(''),
  specialInstructions: Joi.string().allow(''),
});

export const updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled').required(),
  actualDeliveryTime: Joi.date().when('status', {
    is: 'delivered',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

export const rateOrderSchema = Joi.object({
  food: Joi.number().min(1).max(5).required(),
  delivery: Joi.number().min(1).max(5).required(),
  overall: Joi.number().min(1).max(5).required(),
  comment: Joi.string().allow('').max(500),
});

// Promo code validation schemas
export const validatePromoCodeSchema = Joi.object({
  code: Joi.string().required().uppercase(),
  orderValue: Joi.number().min(0).required(),
});