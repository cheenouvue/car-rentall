import { Router } from "express";
import authRoutes from "./authRouter.js"
import userRoutes from "./userRouter.js"
import departmentRoutes from './departmentRouter.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/department', departmentRoutes);

export default router;