import mongoose, { Schema, Document } from 'mongoose';
import { IFood } from '../types';

export interface IFoodDocument extends Document {
  id: string;
  name: string;
  price: number;
  description: string;
  availability: boolean;
  deliveryTime: string;
  imageUrl: string;
  quantity: number;
  category: string;
  restaurant: string;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Very Hot';
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

const FoodSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  availability: {
    type: Boolean,
    required: true,
    default: true,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 50,
  },
  category: {
    type: String,
    required: true,
    enum: ['appetizer', 'main', 'dessert', 'beverage', 'snack', 'pizza', 'burger', 'pasta', 'salad', 'soup'],
  },
  restaurant: {
    type: String,
    required: true,
  },
  ingredients: [{
    type: String,
  }],
  nutritionalInfo: {
    calories: {
      type: Number,
      min: 0,
    },
    protein: {
      type: Number,
      min: 0,
    },
    carbs: {
      type: Number,
      min: 0,
    },
    fat: {
      type: Number,
      min: 0,
    },
  },
  spiceLevel: {
    type: String,
    enum: ['Mild', 'Medium', 'Hot', 'Very Hot'],
    default: 'Medium',
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  isVegan: {
    type: Boolean,
    default: false,
  },
  isGlutenFree: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

FoodSchema.index({ name: 'text', description: 'text' });
FoodSchema.index({ category: 1 });
FoodSchema.index({ restaurant: 1 });
FoodSchema.index({ price: 1 });
FoodSchema.index({ availability: 1 });

export default mongoose.model<IFoodDocument>('Food', FoodSchema);