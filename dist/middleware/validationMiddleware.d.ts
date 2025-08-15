import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
export declare const validate: (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => void;
export declare const createFoodSchema: Joi.ObjectSchema<any>;
export declare const updateFoodSchema: Joi.ObjectSchema<any>;
export declare const createOrderSchema: Joi.ObjectSchema<any>;
export declare const updateOrderStatusSchema: Joi.ObjectSchema<any>;
export declare const rateOrderSchema: Joi.ObjectSchema<any>;
export declare const validatePromoCodeSchema: Joi.ObjectSchema<any>;
//# sourceMappingURL=validationMiddleware.d.ts.map