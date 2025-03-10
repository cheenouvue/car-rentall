import { Router } from "express";
import authRoutes from "./authRouter.js"
import userRoutes from "./userRouter.js"
import departmentRoutes from './departmentRouter.js';
import employeeRoutes from './employeeRouter.js';
import statuRoutes from './statuRouter.js';
import promotionRoutes from './promotionRouter.js';
import couponRoutes from './couponRouter.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/department', departmentRoutes);
router.use('/employee', employeeRoutes);
router.use('/statu', statuRoutes);
router.use('/promotion', promotionRoutes);
router.use('/coupon', couponRoutes);

export default router;