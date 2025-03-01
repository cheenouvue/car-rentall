import { create, list, listID, update, remove } from "../controllers/bank.js";
import { Router } from "express";

const router = Router();
const bank = "/bank";

router.get(bank, list);
router.get(bank + "/:id", listID);
router.post(bank, create);
router.put(bank + "/:id", update);
router.delete(bank + "/:id", remove);

export default router;
