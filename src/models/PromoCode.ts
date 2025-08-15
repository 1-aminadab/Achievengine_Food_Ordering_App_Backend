import mongoose, { Schema, Document } from 'mongoose';
import { IPromoCode } from '../types';

export interface IPromoCodeDocument extends Document {
  id: string;
  code: string;
  description: string;
  discountType: string;
  discountValue: number;
  minimumOrderValue: number;
  maximumDiscount: number;
  usageLimit: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  applicableRestaurants: string[];
}

const PromoCodeSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0,
  },
  minimumOrderValue: {
    type: Number,
    default: 0,
    min: 0,
  },
  maximumDiscount: {
    type: Number,
    min: 0,
  },
  usageLimit: {
    type: Number,
    required: true,
    min: 1,
  },
  usedCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  validFrom: {
    type: Date,
    required: true,
  },
  validUntil: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  applicableRestaurants: [String],
}, {
  timestamps: true,
});

PromoCodeSchema.index({ code: 1 });
PromoCodeSchema.index({ validFrom: 1, validUntil: 1 });
PromoCodeSchema.index({ isActive: 1 });

export default mongoose.model<IPromoCodeDocument>('PromoCode', PromoCodeSchema);