import { Request, Response } from 'express';
import PromoCode from '../models/PromoCode';
import { ApiResponse } from '../types';

export class PromoCodeController {
  static async validatePromoCode(req: Request, res: Response): Promise<void> {
    try {
      const { code, orderValue } = req.body;

      if (!code || !orderValue) {
        const response: ApiResponse = {
          success: false,
          message: 'Promo code and order value are required'
        };
        res.status(400).json(response);
        return;
      }

      const promoCode = await PromoCode.findOne({
        code: code.toUpperCase(),
        isActive: true,
        validFrom: { $lte: new Date() },
        validUntil: { $gte: new Date() },
        usedCount: { $lt: '$usageLimit' }
      }).lean();

      if (!promoCode) {
        const response: ApiResponse = {
          success: false,
          message: 'Invalid or expired promo code'
        };
        res.status(400).json(response);
        return;
      }

      if (Number(orderValue) < promoCode.minimumOrderValue) {
        const response: ApiResponse = {
          success: false,
          message: `Minimum order value for this promo code is ${promoCode.minimumOrderValue} ETB`,
          data: {
            minimumOrderValue: promoCode.minimumOrderValue
          }
        };
        res.status(400).json(response);
        return;
      }

      // Calculate discount
      let discount = 0;
      if (promoCode.discountType === 'percentage') {
        discount = Number(orderValue) * (promoCode.discountValue / 100);
        if (promoCode.maximumDiscount) {
          discount = Math.min(discount, promoCode.maximumDiscount);
        }
      } else {
        discount = promoCode.discountValue;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Promo code is valid',
        data: {
          promoCode: {
            code: promoCode.code,
            description: promoCode.description,
            discountType: promoCode.discountType,
            discountValue: promoCode.discountValue,
            minimumOrderValue: promoCode.minimumOrderValue,
            maximumDiscount: promoCode.maximumDiscount
          },
          discount,
          finalAmount: Number(orderValue) - discount
        }
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Validate promo code error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to validate promo code',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }

  static async getActivePromoCodes(req: Request, res: Response): Promise<void> {
    try {
      const promoCodes = await PromoCode.find({
        isActive: true,
        validFrom: { $lte: new Date() },
        validUntil: { $gte: new Date() },
        usedCount: { $lt: '$usageLimit' }
      })
      .select('code description discountType discountValue minimumOrderValue maximumDiscount validUntil')
      .lean();

      const response: ApiResponse = {
        success: true,
        message: 'Active promo codes retrieved successfully',
        data: promoCodes
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get active promo codes error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to retrieve promo codes',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }
}