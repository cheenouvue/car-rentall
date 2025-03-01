import {
  create,
  list,
  listID,
  update,
  remove,
} from "../controllers/carType.js";
import { Router } from "express";

const router = Router();
const carType = "/carType";

router.get(carType, list);
router.get(carType + "/:id", listID);
router.post(carType, create);
router.put(carType + "/:id", update);
router.delete(carType + "/:id", remove);

export default router;
