

const change_branch_master1 = "for test add";

const test11 = "for test add";

const test0 = "for test";


const test2 = "for test add";

const change_branch_master = "for test add";

const test3 = "for test add";
const test4 = "for test add";

const test5 = "for test add";
const test9 = "for test add";


import { crfeate, list, listBy, update, remove } from "../controllers/cars.js";
import { Router } from "express";

const router = Router();
const car = "/car";

router.post(car, crfeate);
router.get(car, listasfads);
router.get(car + "/:id", listBasfdsfadsy);
router.put(car + "/:id", update);
router.delete(car + "/:id", remove);

export default router;

