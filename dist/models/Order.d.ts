import mongoose, { Document } from 'mongoose';
export interface IOrderDocument extends Document {
    id: string;
    userId: string;
    items: any[];
    totalPrice: number;
    status: string;
    discount: number;
    deliveryFee: number;
    finalTotal: number;
    deliveryType: string;
    deliveryAddress: any;
    paymentMethod: string;
    paymentStatus: string;
    cutleryCount: number;
    promoCode: string;
    specialInstructions: string;
    estimatedDeliveryTime: Date;
    actualDeliveryTime: Date;
    rating: {
        food: number;
        delivery: number;
        overall: number;
        comment: string;
    };
}
declare const _default: mongoose.Model<IOrderDocument, {}, {}, {}, mongoose.Document<unknown, {}, IOrderDocument> & IOrderDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=Order.d.ts.map