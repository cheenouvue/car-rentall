import { Router } from "express";
import statuRoutes from './statuRouter.js';
import promotionRoutes from './promotionRouter.js';
import couponRoutes from './couponRouter.js';

import insurance from "./insurance.js";
import carType from "./carType.js";
import bank from "./bank.js";
import cars from "./cars.js";
import authRoutes from "./authRouter.js";
import userRoutes from "./userRouter.js";
import departmentRoutes from "./departmentRouter.js";
import employeeRoutes from "./employeeRouter.js";
import payment from "./payment.js";
import repair from "./repair.js";
import review from "./review.js";
import rental from "./rental.js";

const router = Router();
const car = "/car";
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/department', departmentRoutes);
router.use('/employee', employeeRoutes);
router.use('/statu', statuRoutes);
router.use('/promotion', promotionRoutes);
router.use('/coupon', couponRoutes);
router.use(car, insurance);
router.use(car, carType);
router.use(car, bank);
router.use(car, cars);
router.use(car, payment);
router.use(car, repair);
router.use(car, review);
router.use(car, rental);

export default router;
