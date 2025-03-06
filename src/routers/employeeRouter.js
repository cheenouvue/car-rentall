import { Router } from "express";
import { addEmployee, changeDepartment, changePhone, getAllEmployees, getOneEmployee, updateSalary } from "../controllers/employeeController.js";
import { authCheckToken, authorizeRole } from "../middleware/authMiddleware.js";
import { changePhoneValidation, employeeValidation, updateSalaryValidation } from "../middleware/validatoins.js";

const router = Router();
const a = 'admin';
const sa = 'superAdmin';

router.post('/insertEmployee', authCheckToken, authorizeRole([sa]), employeeValidation, addEmployee);
router.get('/selAllEmployees', authCheckToken, getAllEmployees);
router.get('/selOneEmployee/:id', authCheckToken, getOneEmployee);
router.put('/updateSalary/:id', authCheckToken, authorizeRole([sa]), updateSalaryValidation, updateSalary);
router.put('/changePhone/:id', authCheckToken, authorizeRole([a, sa]), changePhoneValidation, changePhone);
router.put('/changeDepartment/:id', authCheckToken, authorizeRole([a, sa]), changeDepartment);

export default router;