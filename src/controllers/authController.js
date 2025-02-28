import prisma from '../config/config.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { sendCreated, sendValidator } from '../service/reponseHandler.js';
import { generateAccessToken, generateRefreshToken } from '../service/tokenService.js';

//Register
export const register = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return sendValidator(res, error);
    }

    try {
        const { firstName, lastName, email, password } = req.body;
        const emailExsited = await prisma.users.findUnique({ where: { email } })
        if (emailExsited) {
            return res.status(400).json({ message: 'your email is exsited' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordhash = await bcrypt.hash(password, salt);

        const newUser = await prisma.users.create({ data: { firstName, lastName, email, password: passwordhash } });
        sendCreated(res, 'create user successfully', newUser);
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
};

//Login
export const login = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return sendValidator(res, error);
    };
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'email is reqired' });
        };

        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) {
            return res.status(400).json({ message: 'your password is not true' });
        };

        const accessToken = generateAccessToken(user.id, user.role);
        const refreshToken = generateRefreshToken(user.id, user.role);

        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.status(200).json({ message: 'login successfully',  accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

//logout
export const logout = async(req, res) => {
    try {
        res.clearCookie('accessToken');
        res.status(200).json({ message: 'Logoud is successfully' });
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}