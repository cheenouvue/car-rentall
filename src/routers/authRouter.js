import { Router } from "express";
import { registerValidation, loginValidation } from "../middleware/validatoins.js";
import { register, login, logout } from "../controllers/authController.js";
import { authCheckToken, refreshAccessToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', authCheckToken, logout);
router.post('/refreshToken', refreshAccessToken);

export default router;