"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePromoCodeSchema = exports.rateOrderSchema = exports.updateOrderStatusSchema = exports.createOrderSchema = exports.updateFoodSchema = exports.createFoodSchema = exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const response = {
                success: false,
                message: 'Validation error',
                error: error.details[0]?.message || 'Invalid data provided'
            };
            res.status(400).json(response);
            return;
        }
        next();
    };
};
exports.validate = validate;
exports.createFoodSchema = joi_1.default.object({
    name: joi_1.default.string().required().trim().min(2).max(100),
    description: joi_1.default.string().required().min(10).max(500),
    price: joi_1.default.number().required().min(0),
    availability: joi_1.default.boolean().default(true),
    deliveryTime: joi_1.default.string().required(),
    imageUrl: joi_1.default.string().uri().required(),
    quantity: joi_1.default.number().min(0).default(50),
    category: joi_1.default.string().required().valid('appetizer', 'main', 'dessert', 'beverage', 'snack', 'pizza', 'burger', 'pasta', 'salad', 'soup'),
    restaurant: joi_1.default.string().required(),
    ingredients: joi_1.default.array().items(joi_1.default.string()),
    nutritionalInfo: joi_1.default.object({
        calories: joi_1.default.number().min(0),
        protein: joi_1.default.number().min(0),
        carbs: joi_1.default.number().min(0),
        fat: joi_1.default.number().min(0),
    }),
    spiceLevel: joi_1.default.string().valid('Mild', 'Medium', 'Hot', 'Very Hot').default('Medium'),
    isVegetarian: joi_1.default.boolean().default(false),
    isVegan: joi_1.default.boolean().default(false),
    isGlutenFree: joi_1.default.boolean().default(false),
});
exports.updateFoodSchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(2).max(100),
    description: joi_1.default.string().min(10).max(500),
    price: joi_1.default.number().min(0),
    availability: joi_1.default.boolean(),
    deliveryTime: joi_1.default.string(),
    imageUrl: joi_1.default.string().uri(),
    quantity: joi_1.default.number().min(0),
    category: joi_1.default.string().valid('appetizer', 'main', 'dessert', 'beverage', 'snack', 'pizza', 'burger', 'pasta', 'salad', 'soup'),
    restaurant: joi_1.default.string(),
    ingredients: joi_1.default.array().items(joi_1.default.string()),
    nutritionalInfo: joi_1.default.object({
        calories: joi_1.default.number().min(0),
        protein: joi_1.default.number().min(0),
        carbs: joi_1.default.number().min(0),
        fat: joi_1.default.number().min(0),
    }),
    spiceLevel: joi_1.default.string().valid('Mild', 'Medium', 'Hot', 'Very Hot'),
    isVegetarian: joi_1.default.boolean(),
    isVegan: joi_1.default.boolean(),
    isGlutenFree: joi_1.default.boolean(),
});
exports.createOrderSchema = joi_1.default.object({
    items: joi_1.default.array().items(joi_1.default.object({
        id: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        price: joi_1.default.number().min(0).required(),
        imageUrl: joi_1.default.string().uri().required(),
        quantity: joi_1.default.number().min(1).required(),
        specialRequest: joi_1.default.string().allow(''),
        requiresCutlery: joi_1.default.boolean().default(false),
        customizations: joi_1.default.object({
            spiceLevel: joi_1.default.string(),
            extraCheese: joi_1.default.boolean(),
            extraSauce: joi_1.default.boolean(),
            noOnions: joi_1.default.boolean(),
            specialRequest: joi_1.default.string().allow(''),
        }),
    })).min(1).required(),
    totalPrice: joi_1.default.number().min(0).required(),
    deliveryFee: joi_1.default.number().min(0).default(0),
    deliveryType: joi_1.default.string().valid('delivery', 'pickup').required(),
    deliveryAddress: joi_1.default.when('deliveryType', {
        is: 'delivery',
        then: joi_1.default.object({
            street: joi_1.default.string().required(),
            city: joi_1.default.string().required(),
            state: joi_1.default.string().required(),
            zipCode: joi_1.default.string().required(),
            country: joi_1.default.string().required(),
            coordinates: joi_1.default.object({
                latitude: joi_1.default.number(),
                longitude: joi_1.default.number(),
            }),
        }).required(),
        otherwise: joi_1.default.optional(),
    }),
    paymentMethod: joi_1.default.string().valid('cash', 'card', 'mobile').required(),
    cutleryCount: joi_1.default.number().min(0).default(0),
    promoCode: joi_1.default.string().allow(''),
    specialInstructions: joi_1.default.string().allow(''),
});
exports.updateOrderStatusSchema = joi_1.default.object({
    status: joi_1.default.string().valid('pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled').required(),
    actualDeliveryTime: joi_1.default.date().when('status', {
        is: 'delivered',
        then: joi_1.default.required(),
        otherwise: joi_1.default.optional(),
    }),
});
exports.rateOrderSchema = joi_1.default.object({
    food: joi_1.default.number().min(1).max(5).required(),
    delivery: joi_1.default.number().min(1).max(5).required(),
    overall: joi_1.default.number().min(1).max(5).required(),
    comment: joi_1.default.string().allow('').max(500),
});
exports.validatePromoCodeSchema = joi_1.default.object({
    code: joi_1.default.string().required().uppercase(),
    orderValue: joi_1.default.number().min(0).required(),
});
//# sourceMappingURL=validationMiddleware.js.map