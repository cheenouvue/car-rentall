import { Router } from "express";
import { authCheckToken, authorizeRole } from "../middleware/authMiddleware.js";
import { addCouponValidation, updateCouponValidation } from "../middleware/validatoins.js";
import { addCoupon, deleteCoupon, getAllCoupons, getOneCoupon, updateCoupon, updateStatuActive, updateStatuExpired, updateStatuInactive } from "../controllers/couponController.js";

const router = Router();
const a = 'admin';
const sa = 'superAdmin';

router.post('/insertCoupon', authCheckToken, addCouponValidation, addCoupon);
router.get('/selAllCoupons', authCheckToken, getAllCoupons);
router.get('/selOneCoupon/:id', authCheckToken, getOneCoupon);
router.put('/updateStatuActive/:id', authCheckToken, authorizeRole([a, sa]), updateStatuActive);
router.put('/updateStatuInactive/:id', authCheckToken, authorizeRole([a, sa]), updateStatuInactive);
router.put('/updateStatuExpired/:id', authCheckToken, authorizeRole([a, sa]), updateStatuExpired);
router.put('/updateCoupon/:id', authCheckToken, authorizeRole([a, sa]), updateCouponValidation, updateCoupon);
router.delete('/deleteCoupon/:id', authCheckToken, authorizeRole([a, sa]), deleteCoupon);

export default router;