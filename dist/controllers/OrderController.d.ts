import { Response } from 'express';
import { AuthRequest } from '../types';
export declare class OrderController {
    static createOrder(req: AuthRequest, res: Response): Promise<void>;
    static getUserOrders(req: AuthRequest, res: Response): Promise<void>;
    static getOrderById(req: AuthRequest, res: Response): Promise<void>;
    static updateOrderStatus(req: AuthRequest, res: Response): Promise<void>;
    static cancelOrder(req: AuthRequest, res: Response): Promise<void>;
    static rateOrder(req: AuthRequest, res: Response): Promise<void>;
}
//# sourceMappingURL=OrderController.d.ts.map