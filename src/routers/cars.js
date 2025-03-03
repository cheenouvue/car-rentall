import { create, list, listBy, update, remove,listPrice } from "../controllers/cars.js";
import { Router } from "express";

const router = Router();
const car = "/car";

router.post(car, create);
router.get(car, list);
router.get(car + "by", listBy);
router.get(car + "price", listPrice);
router.put(car + "/:id", update);
router.delete(car + "/:id", remove);

export default router;
