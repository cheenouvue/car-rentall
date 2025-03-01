import {
  create,
  list,
  listID,
  update,
  remove,
} from "../controllers/insurance.js";
import { authCheckToken } from "../middleware/authMiddleware.js";
import { Router } from "express";

const router = Router();
const insurance = "/insurance";

router.get(insurance, list);
router.get(insurance + "/:id", listID);
router.post(insurance, create);
router.put(insurance + "/:id", update);
router.delete(insurance + "/:id", remove);

export default router;
