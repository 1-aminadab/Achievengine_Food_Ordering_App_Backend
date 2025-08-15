"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController_1 = require("../controllers/OrderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.post('/', OrderController_1.OrderController.createOrder);
router.get('/', OrderController_1.OrderController.getUserOrders);
router.get('/:id', OrderController_1.OrderController.getOrderById);
router.patch('/:id/status', OrderController_1.OrderController.updateOrderStatus);
router.patch('/:id/cancel', OrderController_1.OrderController.cancelOrder);
router.post('/:id/rating', OrderController_1.OrderController.rateOrder);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map