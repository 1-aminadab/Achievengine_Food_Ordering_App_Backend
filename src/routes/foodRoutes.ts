import { Router } from 'express';
import { FoodController } from '../controllers/FoodController';

const router = Router();

// Public routes
router.get('/', FoodController.getAllFoods);
router.get('/search', FoodController.searchFoods);
router.get('/categories', FoodController.getFoodCategories);
router.get('/:id', FoodController.getFoodById);

// Admin routes (would require admin authentication in production)
router.post('/', FoodController.createFood);
router.put('/:id', FoodController.updateFood);
router.delete('/:id', FoodController.deleteFood);

export default router;