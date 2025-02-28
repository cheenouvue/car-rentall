import prisma from "../config/config";
import { validationResult } from "express-validator";
import { sendCreated, sendError, sendValidator } from "../service/reponseHandler";

export const addEmployee = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return sendValidator(res, error);
    }
    try {
        const { dept_id, firstName, lastName, email, phone, village, distrit, provinced, salary, brithday } = req.body;
        const natinalIdCard = req.files?.natinalIdCard;
        const emailExsited = await prisma.employees.findUnique({ where: { email } });
        if (emailExsited) {
            return res.status(400).json({ status: false, message: 'your email exsited' });
        };
        const newEmployee = await prisma.employees.create({
            data: { dept_id, firstName, lastName, email, phone, village, distrit, provinced, salary, brithday }
        });
        sendCreated(res, 'create new employee successfully', newEmployee);
    } catch (error) {
        sendError(res, error);
    }
}