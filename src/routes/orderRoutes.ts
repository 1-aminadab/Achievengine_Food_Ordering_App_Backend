import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// All order routes require authentication
router.use(authMiddleware);

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getUserOrders);
router.get('/:id', OrderController.getOrderById);
router.patch('/:id/status', OrderController.updateOrderStatus);
router.patch('/:id/cancel', OrderController.cancelOrder);
router.post('/:id/rating', OrderController.rateOrder);

export default router;