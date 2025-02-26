import { authCheckToken } from "../middleware/authMiddleware.js";
import { getAllUsers, updateRoleAdmin, getOneUser, getUserProfile } from "../controllers/userController.js";
import { Router } from "express";

const router = Router();

router.get('/selAllUsers', authCheckToken, getAllUsers);
router.get('/selOneUser', authCheckToken, getOneUser);
router.get('/selUserProfile', authCheckToken, getUserProfile);
router.put('/updateRoteAdmin', authCheckToken, updateRoleAdmin);

export default router;