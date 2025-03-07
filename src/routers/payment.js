import { create } from "../controllers/payment.js";
import { Router } from "express";

const router = Router();
const payment = "/payment";

router.post(payment, create);
// router.get(payment);
// router.get(payment + "/:id");
// router.put(payment + "/:id");
// router.delete(payment + "/:id");

export default router;
