import prisma from "../config/config.js";
import { validationResult } from "express-validator";
import { sendCreated, sendDelete, sendEmpty, sendError, sendExsited, sendSuccess, sendUpdate, sendValidator } from "../service/reponseHandler.js";
import path from "path";
import { send } from "process";
import exp from "constants";

//create new employee
export const addEmployee = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return sendValidator(res, error);
    }
    try {
        const { dept_id, firstName, lastName, email, phone, village, distrit, provinced, salary, birthday } = req.body;
        const natinalIdCard = req.files?.natinal_id_card;
        const uploadDir = path.join(path.resolve(), 'src/uploads/images');
        const uploadPath = path.join(uploadDir, natinalIdCard.name);
        await natinalIdCard.mv(uploadPath);
        const department = await prisma.departments.findUnique({ where: { id: dept_id } });
        if (!department) {
            return sendEmpty(res, 'department not found');
        }

        const emailExsited = await prisma.employees.findUnique({ where: { email } });
        if (emailExsited) {
            return sendExsited(res, 'email is exsited');
        };

        const phoenExsited = await prisma.employees.findUnique({ where: { phone: parseInt(phone) } });
        if (phoenExsited) {
            return sendExsited(res, 'phone is exsited');
        }

        const natinalIdCarExsited = await prisma.employees.findUnique({ where: { natinalIdCard: natinalIdCard.name } });
        if (natinalIdCarExsited) {
            return sendExsited(res, 'natinalIdCard is exsited');
        }
        const newEmployee = await prisma.employees.create({
            data: { dept_id, firstName, lastName, email, phone: parseInt(phone), village, distrit, provinced, natinalIdCard: natinalIdCard.name, salary: parseFloat(salary), birthday: new Date(birthday) }
        });
        sendCreated(res, 'create new employee successfully', newEmployee);
    } catch (error) {
        sendError(res, error);
    }
}

//get all employees
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await prisma.employees.findMany({
            include: {
                department: true,
            }
        });
        sendSuccess(res, 'get all employee successfully', employees);
    } catch (error) {
        sendEmpty(res, error);
    }
}

//get one employee
export const getOneEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await prisma.employees.findUnique({
            where: { id },
            include: { department: true }
        });
        if (!employee) {
            return sendEmpty(res, 'employee not found');
        }
        sendSuccess(res, 'get one employee successfully', employee);
    } catch (error) {
        sendError(res, error);
    }
}

//update salary
export const updateSalary = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return sendValidator(res, error);
    }
    try {
        const { id } = req.params;
        const { salary } = req.body;
        const employee = await prisma.employees.findUnique({ where: { id } });
        if (!employee) {
            return sendEmpty(res, 'employee not found');
        }
        await prisma.employees.update({
            where: { id },
            data: { salary: parseFloat(salary) }
        });
        sendUpdate(res, 'update salary successfully');
    } catch (error) {
        sendError(res, error);
    }
}

//change phone number
export const changePhone = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return sendValidator(res, error);
    }
    try {
        const { id } = req.params;
        const { phone } = req.body;
        const phoneInt = parseInt(phone);
        const employee = await prisma.employees.findUnique({ where: { id } });
        if (!employee) {
            return sendEmpty(res, 'employee not found');
        }
        if (employee.phone !== phoneInt) {
            const phoneExsited = await prisma.employees.findUnique({ where: { phone: phoneInt } });
            if (phoneExsited) {
                return sendExsited(res, 'phone is exsited');
            }
        }
        await prisma.employees.update({
            where: { id },
            data: { phone: phoneInt }
        });
        sendUpdate(res, 'change phone successfully');
    } catch (error) {
        sendError(res, error);
    }
}

//change department
export const changeDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dept_id } = req.body;
        const employee = await prisma.employees.findUnique({ where: { id } });
        if (!employee) {
            return sendEmpty(res, 'employee not found');
        }
        const department = await prisma.departments.findUnique({ where: { id: dept_id } });
        if (!department) {
            return sendEmpty(res, 'department not found');
        }
        await prisma.employees.update({
            where: { id },
            data: { dept_id }
        });
        sendUpdate(res, 'change department for employee successfully');
    } catch (error) {
        sendError(res, error);
    }
}

//update personal infornation
export const updatePersonalInfo = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return sendValidator(res, error);
    }
    try {
        const { id } = req.params;
        const { firstName, lastName, email, village, distrit, provinced } = req.body;
        const natinal_id_card = req?.files?.natinal_id_card;
        const uploadDir = path.join(path.resolve(), 'uploads');
        const uploadPath = path.join(uploadDir, natinal_id_card.name);
        await natinal_id_card.mv(uploadPath);

        const employee = await prisma.employees.findUnique({ where: { id } });
        if (!employee) {
            return sendEmpty(res, 'employee not found');
        }
        if (employee.email !== email) {
            const emailExsited = await prisma.employees.findUnique({ where: { email } });
            if (emailExsited) {
                return sendExsited(res, 'email is exsited');
            }
        }
        if (employee.natinalIdCard !== natinal_id_card.name) {
            const natinalIdCardExsited = await prisma.employees.findUnique({ where: { natinalIdCard: natinal_id_card.name } });
            if (natinalIdCardExsited) {
                return sendExsited(res, 'natinal_id_card is exsited');
            }
        }
        await prisma.employees.update({
            where: { id },
            data: { firstName, lastName, email, village, distrit, provinced, natinalIdCard: natinal_id_card.name }
        });
        sendUpdate(res, 'update personal infornation successfully');
    } catch (error) {
        sendError(res, error);
    }
}

//delete employee
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await prisma.employees.findUnique({ where: { id } });
        if (!employee) {
            return sendEmpty(res, 'employee not found');
        }
        await prisma.employees.delete({ where: { id } });
        sendDelete(res, 'delete employee successfully');
    } catch (error) {
        sendError(res, error);
    }
}