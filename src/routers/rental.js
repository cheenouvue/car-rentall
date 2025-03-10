import { Router } from "express";
import { create, list, listBy, update, remove } from "../controllers/rental.js";
import { uploadImageWithIdentityCard } from "../controllers/moreImage.js";
import { testItem } from "../controllers/test.js";
const router = Router();
const rental = "/rental";

router.post(rental, create);
router.post("/image", uploadImageWithIdentityCard);
router.post("/test", testItem);

router.get(rental, list);
router.get(rental + "/:id", listBy);
router.put(rental + "/:id", update);
router.delete(rental + "/:id", remove);

export default router;
