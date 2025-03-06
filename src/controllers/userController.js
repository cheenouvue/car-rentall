import { validationResult } from "express-validator";
import prisma from "../config/config.js";
import { sendError, sendSuccess, sendValidator } from "../service/reponseHandler.js";
import bcrypt from "bcryptjs";
import path from 'path';
import fs from 'fs';

//getAllUser
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        sendSuccess(res, 'get all users successfully', users);
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
};

//getOneUser
export const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.users.findUnique({ where: { id } });
        if (!user) {
            return res.status(400).json({ message: "didn't have your userId" })
        }
        sendSuccess(res, 'successfully', user);
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
};

//getUserProfile
export const getUserProfile = async (req, res) => {
    try {
        const user = await prisma.users.findUnique({ where: { id: req.user.id } });
        if (!user) {
            return res.status(400).json({ message: 'your profile is not foun' });
        }
        sendSuccess(res, 'successfully', user);
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

//update Role to Admin
export const updateRoleAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.users.findUnique({ where: { id } });
        if(!user) {
            return res.status(400).json({ message: "user is empty" });
        }
        const roleAdmin = await prisma.users.update({
            where: { id: user.id },
            data: { role: 'admin' }
        });
        sendSuccess(res, 'update to role admin successfully', roleAdmin);
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
};

//update Role to SuperAdmin
export const updateRoleSuperAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.users.findUnique({ where: { id } });
        if (!user) {
            return res.status(400).json({ message: "user is empty" });
        }
        const roleSuperAdmin = await prisma.users.update({
            where: { id: user.id },
            data: { role: 'superAdmin' }
        });
        sendSuccess(res, 'update to role superAdmin successfully', roleSuperAdmin);
    } catch (error) {

    }
};

//update Profile
export const updateProfile = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return sendValidator(res, error);
    }
    try {
        const { firstName, lastName } = req.body;
        const profiles = req?.files?.profile;
         //ສ້າງ folder uploads
         const uploadDir = path.join(path.resolve(), "uploads");
         if (!fs.existsSync(uploadDir)) {
           fs.mkdirSync(uploadDir, { recursive: true });
         }
     
         //ເອົາໄຟສທີ່ອັດໂຫດມາບັນທືກໃນ folder uploads
         const uploadPath = path.join(uploadDir, profiles.name);
         await profiles.mv(uploadPath);
        const updateProfile = await prisma.users.update({
            where: { id: req.user.id },
            data: { firstName, lastName, profile: profiles.name },
        });
        if (!updateProfile) {
            return res.status(400).json({ message: 'your profile is empty' });
        }
        sendSuccess(res, 'update your profile successfully', updateProfile);
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
};

//delete user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.users.findUnique({ where: { id } });
        if (!user) {
            return res.status(400).json({ message: "cann't delete user by your id" });
        }
        const deleteUser = await prisma.users.delete({ where: { id: user.id } });
        sendSuccess(res, 'delete user successfully', deleteUser);
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

//change password
export const changePassword = async(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return sendValidator(res, error);
    }
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await prisma.users.findUnique({ where: {id: req.user.id} });
        if(!user) {
            return res.status(400).json({ message: 'user not foun' });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'old password not ture' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        const changePassword = await prisma.users.update({
            where: {id: user.id},
            data: { password: hashPassword }
        });
        sendSuccess(res, 'change password successfully', changePassword);
    } catch (error) {
        sendError(res, message);
    }
}