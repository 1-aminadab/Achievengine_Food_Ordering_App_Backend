"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PromoCodeController_1 = require("../controllers/PromoCodeController");
const router = (0, express_1.Router)();
router.post('/validate', PromoCodeController_1.PromoCodeController.validatePromoCode);
router.get('/active', PromoCodeController_1.PromoCodeController.getActivePromoCodes);
exports.default = router;
//# sourceMappingURL=promoRoutes.js.map