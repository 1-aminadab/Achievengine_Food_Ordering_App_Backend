"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const FoodSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.default.model('Food', FoodSchema);
//# sourceMappingURL=Food.js.map