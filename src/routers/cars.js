import { create, list, listBy, update, remove } from "../controllers/cars.js";
import { Router } from "express";

const router = Router();
const car = "/car";

router.post(car, create);
router.get(car, list);
router.get(car + "/:id", listBy);
router.put(car + "/:id", update);
router.delete(car + "/:id", remove);

export default router;
