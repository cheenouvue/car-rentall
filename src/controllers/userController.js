import prisma from "../config/config.js";
import { sendSuccess, sendUpdate } from "../service/reponseHandler.js";

export const getAllUsers = async(req, res) => {
    try {
        const users = await prisma.users.findMany();
        sendSuccess(res, 'get all users successfully', users);
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
};

export const getOneUser = async(req, res) => {
    try {
        const { userId } = req.body;
        const user = await prisma.users.findUnique({ where: { id: userId } });
        if(!user) {
            return res.status(400).json({ message: "didn't have your userId" })
        }
        sendSuccess(res, 'successfully', user);
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
};

export const getUserProfile = async(req, res) => {
    try {
        const user = await prisma.users.findUnique({ where: {id: req.user.id} });
        if(!user) {
            return res.status(400).json({ message: 'your profile is not foun' });
        }
        sendSuccess(res, 'successfully', user);
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

export const updateRoleAdmin = async(req, res) => {
    try {
        const { userId } = req.body;
        const roleUser = await prisma.users.update({
            where: {id: userId},
            data: {role: 'admin'}
        });
        if (!roleUser) {
            res.status(400).json({ message: 'your role is not foun' });
        }
        sendSuccess(res, 'update role successfully', roleUser);
    } catch (error) {
        res.status(500).json({errors: error.message});
    }
};