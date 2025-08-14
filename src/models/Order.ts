import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from '../types';

export interface IOrderDocument extends IOrder, Document {}

const OrderSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
  items: [{
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    specialRequest: String,
    requiresCutlery: {
      type: Boolean,
      default: false,
    },
    customizations: {
      spiceLevel: String,
      extraCheese: Boolean,
      extraSauce: Boolean,
      noOnions: Boolean,
      specialRequest: String,
    },
  }],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
  },
  deliveryFee: {
    type: Number,
    default: 0,
    min: 0,
  },
  finalTotal: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'pending',
  },
  deliveryType: {
    type: String,
    enum: ['delivery', 'pickup'],
    required: true,
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'mobile'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  cutleryCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  promoCode: String,
  specialInstructions: String,
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  rating: {
    food: {
      type: Number,
      min: 1,
      max: 5,
    },
    delivery: {
      type: Number,
      min: 1,
      max: 5,
    },
    overall: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: String,
  },
}, {
  timestamps: true,
});

OrderSchema.index({ userId: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

export default mongoose.model<IOrderDocument>('Order', OrderSchema);