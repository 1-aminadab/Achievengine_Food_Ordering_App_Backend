import { Request } from 'express';

export interface IFood {
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  specialRequest?: string;
  requiresCutlery?: boolean;
  customizations?: {
    spiceLevel?: string;
    extraCheese?: boolean;
    extraSauce?: boolean;
    noOnions?: boolean;
    specialRequest?: string;
  };
}

export interface IUser {
  _id?: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  preferences?: {
    favoriteRestaurants: string[];
    dietaryRestrictions: string[];
    preferredCuisines: string[];
  };
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: 'customer' | 'restaurant' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrder {
  _id?: string;
  id: string;
  userId: string;
  items: ICartItem[];
  totalPrice: number;
  discount: number;
  deliveryFee: number;
  finalTotal: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';
  deliveryType: 'delivery' | 'pickup';
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  paymentMethod: 'cash' | 'card' | 'mobile';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  cutleryCount: number;
  promoCode?: string;
  specialInstructions?: string;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  rating?: {
    food: number;
    delivery: number;
    overall: number;
    comment?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRestaurant {
  _id?: string;
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phone: string;
    email: string;
  };
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  rating: {
    average: number;
    count: number;
  };
  priceRange: 'Low' | 'Medium' | 'High' | 'Premium';
  deliveryFee: number;
  minimumOrder: number;
  estimatedDeliveryTime: string;
  imageUrl: string;
  menu: string[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPromoCode {
  _id?: string;
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minimumOrderValue: number;
  maximumDiscount?: number;
  usageLimit: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  applicableRestaurants?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FoodFilters extends PaginationQuery {
  category?: string;
  restaurant?: string;
  minPrice?: number;
  maxPrice?: number;
  isVegetarian?: string;
  isVegan?: string;
  isGlutenFree?: string;
  spiceLevel?: string;
  search?: string;
}