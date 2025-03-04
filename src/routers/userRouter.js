import { authCheckToken } from "../middleware/authMiddleware.js";
import { getAllUsers, updateRoleAdmin, getOneUser, getUserProfile } from "../controllers/userController.js";
import { Router } from "express";

const router = Router();
router.get('/selAllUsers', authCheckToken, authorizeRole([a, sa]), getAllUsers);
router.get('/selOneUser/:id', authCheckToken, authorizeRole([a, sa]), getOneUser);
router.get('/selProfile', authCheckToken, getUserProfile);
router.put('/updateRoleAdmin/:id', authCheckToken, updateRoleAdmin);
router.put('/updateRoleSuperAdmin/:id', authCheckToken, updateRoleSuperAdmin);
router.put('/updateProfile', authCheckToken, profileValidation, updateProfile);
router.post('/changePassword', authCheckToken, passworkValidation, changePassword);
router.delete('/deleteUser/:id', authCheckToken, authorizeRole([a, sa]), deleteUser);
export default router;