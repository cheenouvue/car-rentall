import prisma from "../config/config.js";
import { validationResult } from "express-validator";
import { sendDelete, sendEmpty, sendError, sendSuccess, sendValidator } from "../service/reponseHandler.js";

//create new department
export const addDepartment = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return sendValidator(res, error);
    };
    const { deptName, pricePerDay } = req.body;
    const departmentExsited = await prisma.departments.findUnique({ where: { deptName } });
    if (departmentExsited) {
        return res.status(400).json({ message: 'your department name is exsited' });
    };
    const newDepartment = await prisma.departments.create({
        data: { deptName, pricePerDay }
    });
    sendSuccess(res, 'create new department successfully', newDepartment);
}

//select all departments
export const getAllDepartment = async (req, res) => {
    try {
        const allDepartment = await prisma.departments.findMany();
        sendSuccess(res, 'select all department successfull', allDepartment);
    } catch (error) {
        sendError(res, error);
    }
}

//update department by id
export const updateDepartment = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return sendValidator(res, error);
    }
    try {
        const { id } = req.params;
        const { deptName, pricePerDay } = req.body;
        const department = await prisma.departments.findUnique({ where: { id } });
        if (!department) {
            return sendEmpty(res, 'department not foun');
        };
        if (department.deptName !== deptName) {
            const deptNameExsited = await prisma.departments.findUnique({ where: { deptName } });
            if (deptNameExsited) {
                return sendEmpty(res, 'deptName is exsited');
            };
        };
        const updateDepartment = await prisma.departments.update({
            where: { id },
            data: { deptName, pricePerDay }
        });
        sendSuccess(res, 'updateDepartment successfully', updateDepartment);
    } catch (error) {
        sendError(res, error);
    }
}

//delete department
export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await prisma.departments.findUnique({ where: { id } });
        if (!department) {
            return sendEmpty(res, 'department not foun')
        };
        const deleteDepartment = await prisma.departments.delete({ where: { id } });
        sendDelete(res, 'delete department successfully');
    } catch (error) {
        sendError(res, error);
    }
}