import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IPromoCodeDocument, {}, {}, {}, mongoose.Document<unknown, {}, IPromoCodeDocument> & IPromoCodeDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=PromoCode.d.ts.map