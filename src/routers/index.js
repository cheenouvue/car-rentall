import { Router } from "express";
import authRoutes from "./authRouter.js"
import userRoutes from "./userRouter.js"

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;