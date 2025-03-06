import { authCheckToken, authorizeRole } from "../middleware/authMiddleware.js";
import { getAllUsers, updateRoleAdmin, updateRoleSuperAdmin, getOneUser, getUserProfile, updateProfile, deleteUser, changePassword } from "../controllers/userController.js";
import { Router } from "express";
import { profileValidation, passworkValidation } from "../middleware/validatoins.js";

const router = Router();
const u = 'user';
const a = "admin";
const sa = 'superAdmin';

router.get('/selAllUsers', authCheckToken, authorizeRole([a, sa]), getAllUsers);
router.get('/selOneUser/:id', authCheckToken, authorizeRole([a, sa]), getOneUser);
router.get('/selProfile', authCheckToken, getUserProfile);
router.put('/updateRoleAdmin/:id', authCheckToken, authorizeRole([sa]), updateRoleAdmin);
router.put('/updateRoleSuperAdmin/:id', authCheckToken, authorizeRole([sa]), updateRoleSuperAdmin);
router.put('/updateProfile', authCheckToken, profileValidation, updateProfile);
router.post('/changePassword', authCheckToken, passworkValidation, changePassword);
router.delete('/deleteUser/:id', authCheckToken, authorizeRole([a, sa]), deleteUser);
export default router;