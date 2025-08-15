import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IFoodDocument, {}, {}, {}, mongoose.Document<unknown, {}, IFoodDocument> & IFoodDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=Food.d.ts.map