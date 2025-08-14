import { Response } from 'express';
import Order from '../models/Order';
import PromoCode from '../models/PromoCode';
import { AuthRequest, ApiResponse } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class OrderController {
  static async createOrder(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          message: 'User not authenticated'
        };
        res.status(401).json(response);
        return;
      }

      const orderData = {
        ...req.body,
        id: uuidv4(),
        userId: req.user.id,
        status: 'pending',
        paymentStatus: 'pending',
        estimatedDeliveryTime: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now
      };

      // Validate promo code if provided
      if (orderData.promoCode) {
        const promoCode = await PromoCode.findOne({
          code: orderData.promoCode.toUpperCase(),
          isActive: true,
          validFrom: { $lte: new Date() },
          validUntil: { $gte: new Date() },
          usedCount: { $lt: '$usageLimit' }
        });

        if (!promoCode) {
          const response: ApiResponse = {
            success: false,
            message: 'Invalid or expired promo code'
          };
          res.status(400).json(response);
          return;
        }

        if (orderData.totalPrice < promoCode.minimumOrderValue) {
          const response: ApiResponse = {
            success: false,
            message: `Minimum order value for this promo code is ${promoCode.minimumOrderValue} ETB`
          };
          res.status(400).json(response);
          return;
        }

        // Calculate discount
        let discount = 0;
        if (promoCode.discountType === 'percentage') {
          discount = orderData.totalPrice * (promoCode.discountValue / 100);
          if (promoCode.maximumDiscount) {
            discount = Math.min(discount, promoCode.maximumDiscount);
          }
        } else {
          discount = promoCode.discountValue;
        }

        orderData.discount = discount;
        orderData.finalTotal = orderData.totalPrice - discount + orderData.deliveryFee;

        // Update promo code usage
        await PromoCode.findByIdAndUpdate(promoCode._id, {
          $inc: { usedCount: 1 }
        });
      } else {
        orderData.finalTotal = orderData.totalPrice + orderData.deliveryFee;
      }

      const order = new Order(orderData);
      await order.save();

      const response: ApiResponse = {
        success: true,
        message: 'Order created successfully',
        data: order
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Create order error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to create order',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }

  static async getUserOrders(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          message: 'User not authenticated'
        };
        res.status(401).json(response);
        return;
      }

      const { page = 1, limit = 10, status } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      
      const query: any = { userId: req.user.id };
      if (status && typeof status === 'string') {
        query.status = status;
      }

      const orders = await Order.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean();

      const total = await Order.countDocuments(query);
      const pages = Math.ceil(total / Number(limit));

      const response: ApiResponse = {
        success: true,
        message: 'Orders retrieved successfully',
        data: orders,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages
        }
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get user orders error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to retrieve orders',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }

  static async getOrderById(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          message: 'User not authenticated'
        };
        res.status(401).json(response);
        return;
      }

      const { id } = req.params;
      const order = await Order.findOne({ 
        id, 
        userId: req.user.id 
      }).lean();

      if (!order) {
        const response: ApiResponse = {
          success: false,
          message: 'Order not found'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Order retrieved successfully',
        data: order
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get order by ID error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to retrieve order',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }

  static async updateOrderStatus(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status, actualDeliveryTime } = req.body;

      const updateData: any = { status };
      if (status === 'delivered' && actualDeliveryTime) {
        updateData.actualDeliveryTime = new Date(actualDeliveryTime);
      }

      const order = await Order.findOneAndUpdate(
        { id },
        updateData,
        { new: true, runValidators: true }
      ).lean();

      if (!order) {
        const response: ApiResponse = {
          success: false,
          message: 'Order not found'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Order status updated successfully',
        data: order
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Update order status error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to update order status',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }

  static async cancelOrder(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          message: 'User not authenticated'
        };
        res.status(401).json(response);
        return;
      }

      const { id } = req.params;
      const order = await Order.findOne({ 
        id, 
        userId: req.user.id 
      });

      if (!order) {
        const response: ApiResponse = {
          success: false,
          message: 'Order not found'
        };
        res.status(404).json(response);
        return;
      }

      if (order.status === 'delivered' || order.status === 'cancelled') {
        const response: ApiResponse = {
          success: false,
          message: 'Cannot cancel this order'
        };
        res.status(400).json(response);
        return;
      }

      order.status = 'cancelled';
      await order.save();

      const response: ApiResponse = {
        success: true,
        message: 'Order cancelled successfully',
        data: order
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Cancel order error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to cancel order',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }

  static async rateOrder(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          message: 'User not authenticated'
        };
        res.status(401).json(response);
        return;
      }

      const { id } = req.params;
      const { food, delivery, overall, comment } = req.body;

      const order = await Order.findOne({ 
        id, 
        userId: req.user.id,
        status: 'delivered'
      });

      if (!order) {
        const response: ApiResponse = {
          success: false,
          message: 'Order not found or not delivered yet'
        };
        res.status(404).json(response);
        return;
      }

      order.rating = {
        food: Number(food),
        delivery: Number(delivery),
        overall: Number(overall),
        comment: comment || ''
      };

      await order.save();

      const response: ApiResponse = {
        success: true,
        message: 'Order rated successfully',
        data: order
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Rate order error:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to rate order',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(response);
    }
  }
}