import { check } from "express-validator";

export const registerValidation = [
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('lastName is required'),
    check('email').isEmail().withMessage('email is not true'),
    check('password').isLength({ min: 6 }).withMessage('your password should lkong than 6')
];

export const loginValidation = [
    check('email').isEmail().withMessage('your email not true'),
    check('password').isLength({ min: 6 }).withMessage('your password not true')
];