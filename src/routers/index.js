import { Router } from "express";
import authRoutes from "./authRouter.js";
import userRoutes from "./userRouter.js";
import insurance from "./insurance.js";
import carType from "./carType.js";
import bank from "./bank.js";
import cars from "./cars.js";

const router = Router();
const car = "/car";
const test = "/car";

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use(car, insurance);
router.use(car, carType);
router.use(car, bank);
router.use(car, cars);

export default router;
