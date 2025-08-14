import { Router } from 'express';
import { PromoCodeController } from '../controllers/PromoCodeController';

const router = Router();

router.post('/validate', PromoCodeController.validatePromoCode);
router.get('/active', PromoCodeController.getActivePromoCodes);

export default router;