import prisma from "../config/config.js";
import { validationResult } from "express-validator";
import { sendCreated, sendDelete, sendEmpty, sendError, sendExsited, sendSuccess, sendUpdate, sendValidator } from "../service/reponseHandler.js";
import path from "path";
import fs from "fs";

// create new employee
export const addEmployee = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return sendValidator(res, error);
  }

  try {
    const { dept_id, firstName, lastName, email, phone, village, distrit, provinced, salary, birthday } = req.body;

    const natinalIdCard = req.files?.natinal_id_card;

    //ສ້າງ folder uploads
    const uploadDir = path.join(path.resolve(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    //ເອົາໄຟສທີ່ອັດໂຫດມາບັນທືກໃນ folder uploads
    const uploadPath = path.join(uploadDir, natinalIdCard.name);
    await natinalIdCard.mv(uploadPath);

    const dePartment = await prisma.departments.findUnique({ where: { id: dept_id } });
    if (!dePartment) {
      return sendEmpty(res, 'dept_id not found');
    }

    const emailExsited = await prisma.employees.findUnique({ where: { email } });
    if (emailExsited) {
      return sendExsited(res, 'email is exsited');
    }

    const phoneExsited = await prisma.employees.findUnique({ where: { phone } });
    if (phoneExsited) {
      return sendExsited(res, 'phone is exsited');
    }

    const newEmployee = await prisma.employees.create({
      data: {
        dept_id,
        firstName,
        lastName,
        email,
        phone,
        village,
        distrit,
        provinced,
        natinalIdCard: `${natinalIdCard.name}`,
        salary: parseFloat(salary),
        birthday: new Date(birthday)
      }
    });

    return sendCreated(res, 'create new employee successfully', newEmployee);
  } catch (error) {
    return sendError(res, error);
  }
}

//get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employees.findMany();
    sendSuccess(res, 'get all employees successfully', employees);
  } catch (error) {
    sendError(res, error);
  }
}

//get one employee
export const getOneEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employees.findFirst({ where: { id } });
    if (!employee) {
      return sendEmpty(res, 'employee not found');
    };
    sendSuccess(res, 'get one employee successfully', employee);
  } catch (error) {
    return sendError(res, error);
  }
}

//update personal information
export const updatePersonalInfo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return sendValidator(res, error);
  }
  try {
    const { id } = req.params;
    const { firstName, lastName, email, village, distrit, provinced } = req.body;
    const natinalIdCard = req?.files?.natinal_id_card;

    //ສ້າງ folder uploads
    const uploadDir = path.join(path.resolve(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    //ເອົາໄຟສທີ່ອັດໂຫດມາບັນທືກໃນ folder uploads
    const uploadPath = path.join(uploadDir, natinalIdCard.name);
    await natinalIdCard.mv(uploadPath);
    const employee = await prisma.employees.findFirst({ where: { id } });
    if (!employee) {
      return sendEmpty(res, 'employee not found');
    }
    if (email !== employee.email) {
      const emailExsited = await prisma.employees.findUnique({ where: { email } });
      if (emailExsited) {
        return sendExsited(res, 'email is exsited');
      }
    }
    const updatePersonalInfo = await prisma.employees.update({
      where: { id },
      data: { firstName, lastName, email, village, distrit, provinced, natinalIdCard: natinalIdCard?.name }
    });
    sendSuccess(res, 'update presonal information successfully', updatePersonalInfo);
  } catch (error) {
    return sendError(res, error);
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
    const employee = await prisma.employees.findFirst({ where: { id } });
    if (!employee) {
      return sendEmpty(res, 'employee not found');
    }
    const updateSalary = await prisma.employees.update({
      where: { id },
      data: { salary: parseFloat(salary) }
    });
    return sendSuccess(res, 'update salary successfully', updateSalary);
  } catch (error) {
    return sendError(res, error);
  }
}

//change phone number
export const updatePhone = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return sendValidator(res, error);
  }
  try {
    const { id } = req.params;
    const { phone } = req.body;
    const employee = await prisma.employees.findFirst({ where: { id } });
    if (employee) {
      return sendEmpty(res, 'employee not found');
    }
    if (phone !== employee.email) {
      const phoneExsited = await prisma.employees.findUnique({ where: { phone } });
      if (phoneExsited) {
        return sendExsited(res, 'phone is exsited');
      }
    }
    const updatePhone = await prisma.employees.update({
      where: { id },
      data: { phone }
    });
    return sendSuccess(res, 'update phone successfully', updatePhone);
  } catch (error) {
    return sendError(res, error);
  }
}

//change department for employee
export const updateDeptEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { dept_id } = req.body;
    const employee = await prisma.employees.findFirst({ where: { id } });
    if (!employee) {
      return sendEmpty(res, 'employee not found');
    }
    const department = await prisma.departments.findFirst({ where: { id: dept_id } });
    if (!department) {
      return sendEmpty(res, 'department not found');
    }
    const updateDeptEmployee = await prisma.employees.update({
      where: { id },
      data: { dept_id }
    });
    sendSuccess(res, 'change department for employee successfully', updateDeptEmployee);
  } catch (error) {
    sendError(res, error);
  }
}

//delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employees.findFirst({ where: { id } });
    if (!employee) {
      return sendEmpty(res, 'employee not found');
    }
    const deleteEmployee = await prisma.employees.delete({ where: { id } });
    sendDelete(res, 'delete employee successfully')
  } catch (error) {
    sendError(res, error);
  }
}