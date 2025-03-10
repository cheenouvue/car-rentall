import { Router } from "express";
import { create, list, listBy, update, remove } from "../controllers/rental.js"

const router = Router();
const rental = "/rental";

router.post(rental, create);


router.get(rental, list);
router.get(rental + "/:id", listBy);
router.put(rental + "/:id", update);
router.delete(rental + "/:id", remove);

export default router;
