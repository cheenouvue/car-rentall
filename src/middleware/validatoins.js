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
    check('profile')
        .optional({ checkFalsy: true }) // ✅ ป้องกัน error ซ้อนกัน
        .matches(/(https?:\/\/.*\.(?:jpg|jpeg|png|gif)|data:image\/(jpeg|png|gif);base64,)/i)
        .withMessage('Profile must be a valid image URL or Base64 image')
];

export const passworkValidation = [
    check('oldPassword').isLength({ min: 6 }).withMessage('Old Password must be at least 8 characters long'),
    check('newPassword').isLength({ min: 6 }).withMessage('New Password must be at least 8 characters long')
];

export const employeeValidation = [
    check('dept_id').notEmpty().withMessage('dept_id is required'),
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('lastName is required'),
    check('email').isEmail().withMessage('email not true'),
    check('phone').isInt().withMessage('phone should be number'),
    check('village').notEmpty().withMessage('village is required'),
    check('distrit').notEmpty().withMessage('distrit is required'),
    check('provinced').notEmpty().withMessage('provinced is required'),
    check('salary').isFloat().withMessage('salary should be number'),
    check('birthday').isDate().withMessage('birthday is required'),
    check('natinal_id_card').optional({ checkFalsy: true })
        .matches(/(https?:\/\/.*\.(?:jpg|jpeg|png|gif)|data:image\/(jpeg|png|gif);base64,)/i)
        .withMessage('natinal_id_card must be a valid image URL or Base64 image')
];

export const updateSalaryValidation = [
    check('salary').isFloat().withMessage('salary should be number')
];

export const changePhoneValidation = [
    check('phone').isInt().withMessage('phone should be number')
];

export const departmentValidation = [
    check('deptName').notEmpty().withMessage('deptname is require'),
    check('pricePerDay').optional({ checkFalsy: true }).isFloat().withMessage('pricePerDay should be number')
];