import { Router } from "express";
import { authCheckToken, authorizeRole } from "../middleware/authMiddleware.js";
import { addDepartment, deleteDepartment, getAllDepartment, updateDepartment } from "../controllers/departmentController.js";
import { departmentValidation } from "../middleware/validatoins.js";

const router = Router();

const u = 'user';
const a = "admin";
const sa = 'superAdmin';

router.post('/insertDepartment', authCheckToken, authorizeRole([a, sa]), departmentValidation, addDepartment);
router.get('/selAllDepartments', authCheckToken, authorizeRole([ a, sa ]), getAllDepartment);
router.put('/updateDepartment', authCheckToken, authorizeRole([ a, sa ]), departmentValidation, updateDepartment);
router.delete('/deleteDepartment/:id', authCheckToken, authorizeRole([ a,sa ]), deleteDepartment);

export default router;