import { create, list, listBy, update, remove } from "../controllers/repair.js";
import { Router } from "express";

const router = Router();
const repair = "/repair";

router.post(repair, create);
router.get(repair, list);
router.get(repair + "/:id", listBy);
router.put(repair + "/:id", update);
router.delete(repair + "/:id", remove);

export default router;
