import { Router } from "express";
import { authCheckToken, authorizeRole } from "../middleware/authMiddleware.js";
import { addPromotionValidation, datePromotionValidation, pricePromotionValidation, TitelPromotionValidation } from "../middleware/validatoins.js";
import { addPromotion, deletePromotion, getAllPromotions, getOnePromotion, updateDatePromotion, updatePricePromotion, updateStatuActive, updateStatuExpired, updateStatuInactive, updateTitelPromotion } from "../controllers/promotionController.js";

const router = Router();
const a = 'admin';
const sa = 'superAdmin'

router.post('/insertPromotion', authCheckToken, authorizeRole([a, sa]), addPromotionValidation, addPromotion);
router.get('/selAllPromotions', authCheckToken, getAllPromotions);
router.get('/selOnePromotion/:id', authCheckToken, getOnePromotion);
router.put('/updateTitelPromotion/:id', authCheckToken, authorizeRole([a, sa]), TitelPromotionValidation, updateTitelPromotion);
router.put('/updatePricePromotion/:id', authCheckToken, authorizeRole([a, sa]), pricePromotionValidation, updatePricePromotion);
router.put('/updateStatuActive/:id', authCheckToken, authorizeRole([a, sa]), updateStatuActive);
router.put('/updateStatuInactive/:id', authCheckToken, authorizeRole([a, sa]), updateStatuInactive);
router.put('/updateStatuExpired/:id', authCheckToken, authorizeRole([a, sa]), updateStatuExpired);
router.put('/updateDatePromotion/:id', authCheckToken, authorizeRole([a, sa]), datePromotionValidation, updateDatePromotion);
router.delete('/deletePromotion/:id', authCheckToken, authorizeRole([a, sa]), deletePromotion);

export default router;