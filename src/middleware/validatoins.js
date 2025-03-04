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

export const profileValidation = [
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('lastName is required'),
    check('profile').isURL().matches(/\.(jpg|jpeg|png|gif)$/i).withMessage('Profile must be a valid image URL (jpg, jpeg, png, gif)')
];

export const passworkValidation = [
    check('oldPassword').isLength({ min: 6 }).withMessage('Old Password must be at least 6 characters long'),
    check('newPassword').isLength({ min: 6 }).withMessage('New Password must be at least 6 characters long')
];

export const employeeValidation = [
    check('dept_id').notEmpty().withMessage('dept_id is required'),
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('lastName is required'),
    check('email').isEmail().withMessage('email not true'),
    check('phone').isInt().withMessage('phone is required'),
    check('village').notEmpty().withMessage('village is required'),
    check('distrit').notEmpty().withMessage('distrit is required'),
    check('provinced').notEmpty().withMessage('provinced is required'),
    check('salary').isFloat().withMessage('salary is required'),
    check('birthday').isDate().withMessage('birthday is required'),
    check('natinal_id_card').isEmpty().withMessage('natinal_id_car is required')
];

export const updateInfoValidation = [
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('lastName is required'),
    check('email').isEmail().withMessage('email not true'),
    check('village').notEmpty().withMessage('village is required'),
    check('distrit').notEmpty().withMessage('distrit is required'),
    check('provinced').notEmpty().withMessage('provinced is required'),
    check('natinal_id_card').isEmpty().withMessage('natinal_id_car is required')
]

export const updateSalaryValidation = [
    check('salary').isFloat().withMessage('salary is require')
];
export const updatePhoneValidation = [
    check('phone').notEmpty().withMessage('phone is require')
];

export const departmentValidation = [
    check('deptName').notEmpty().withMessage('deptname is require'),
    check('pricePerDay').optional({checkFalsy: true}).isFloat().withMessage('pricePerDay should be number')
];
