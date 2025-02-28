import { check } from "express-validator";

export const registerValidation = [
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('lastName is required'),
    check('email').isEmail().withMessage('email is not true'),
    check('password').isLength({ min: 6 }).withMessage('your password should lkong than 6'),
];

export const loginValidation = [
    check('email').isEmail().withMessage('your email not true'),
    check('password').isLength({ min: 6 }).withMessage('your password not true')
];

export const profileValidation = [
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('lastName is required'),
    check('profile').isURL().matches(/\.(jpg|jpeg|png|gif)$/i).withMessage('Profile must be a valid image URL (jpg, jpeg, png, gif)')
];

export const passworkValidation = [
    check('oldPassword').isLength({ min: 6 }).withMessage('Old Password must be at least 8 characters long'),
    check('newPassword').isLength({ min: 6 }).withMessage('New Password must be at least 8 characters long')
];

export const employeeValidation = [
    check('')
];

export const departmentValidation = [
    check('deptName').notEmpty().withMessage('deptname is require'),
    check('pricePerDay').optional({checkFalsy: true}).isFloat().withMessage('pricePerDay should be number')
];