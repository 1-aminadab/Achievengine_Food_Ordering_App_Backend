"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FoodController_1 = require("../controllers/FoodController");
const router = (0, express_1.Router)();
router.get('/', FoodController_1.FoodController.getAllFoods);
router.get('/search', FoodController_1.FoodController.searchFoods);
router.get('/categories', FoodController_1.FoodController.getFoodCategories);
router.get('/:id', FoodController_1.FoodController.getFoodById);
router.post('/', FoodController_1.FoodController.createFood);
router.put('/:id', FoodController_1.FoodController.updateFood);
router.delete('/:id', FoodController_1.FoodController.deleteFood);
exports.default = router;
//# sourceMappingURL=foodRoutes.js.map