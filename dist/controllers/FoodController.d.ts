import { Request, Response } from 'express';
export declare class FoodController {
    static getAllFoods(req: Request, res: Response): Promise<void>;
    static getFoodById(req: Request, res: Response): Promise<void>;
    static createFood(req: Request, res: Response): Promise<void>;
    static updateFood(req: Request, res: Response): Promise<void>;
    static deleteFood(req: Request, res: Response): Promise<void>;
    static getFoodCategories(req: Request, res: Response): Promise<void>;
    static searchFoods(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=FoodController.d.ts.map