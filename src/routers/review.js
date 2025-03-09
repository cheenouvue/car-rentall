import { Router } from "express";
import { create, list, listBy, remove, update } from "../controllers/review.js";
const router = Router();
const review = "/review";

router.post(review, create);
router.get(review, list);
router.get(review + "/:id", listBy);
router.put(review + "/:id", update);
router.delete(review + "/:id", remove);

export default router;
