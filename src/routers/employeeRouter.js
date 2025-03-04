import { Router } from "express";
import { addEmployee, deleteEmployee, getAllEmployees, getOneEmployee, updateDeptEmployee, updatePersonalInfo, updatePhone, updateSalary } from "../controllers/employeeController.js";
import { authCheckToken, authorizeRole } from "../middleware/authMiddleware.js";
import { employeeValidation, updateInfoValidation, updatePhoneValidation, updateSalaryValidation } from "../middleware/validatoins.js";

const router = Router();

const u = 'user';
const a = "admin";
const sa = 'superAdmin';

router.post('/insertEmployee', authCheckToken, authorizeRole([a, sa]), employeeValidation, addEmployee);
router.get('/selAllEmployees', authCheckToken, authorizeRole([u, a, sa]), getAllEmployees);
router.get('/selOneEmployee/:id', authCheckToken, authorizeRole([u, a, sa]), getOneEmployee);
router.put('/updatePersonalInfo/:id', authCheckToken, authorizeRole([a, sa]), updateInfoValidation, updatePersonalInfo);
router.put('/updateSalary/:id', authCheckToken, authorizeRole([a, sa]), updateSalaryValidation, updateSalary);
router.put('/changePhone/:id', authCheckToken, authorizeRole([a, sa]), updatePhoneValidation, updatePhone);
router.put('/changeDepartment/:id', authCheckToken, authorizeRole([a, sa]), updateDeptEmployee);
router.delete('/deleteDepartment/:id', authCheckToken, authorizeRole([a, sa]), deleteEmployee);

export default router;