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

export const updatePersonalInfoValidation = [
    check('firstName').notEmpty().withMessage('firstName is require'),
    check('lastName').notEmpty().withMessage('lastName is require'),
    check('email').isEmail().withMessage('email not true'),
    check('village').notEmpty().withMessage('village is require'),
    check('distrit').notEmpty().withMessage('distrit is require'),
    check('provinced').notEmpty().withMessage('provinced is require'),
    check('natinal_id_card').optional({ checkFalsy: true })
        .matches(/(https?:\/\/.*\.(?:jpg|jpeg|png|gif)|data:image\/(jpeg|png|gif);base64,)/i)
        .withMessage('natinal_id_card must be a valid image URL or Base64 image')
];

export const addStatuValidation = [
    check('statu').isInt().withMessage('statu should be number'),
    check('statu_user').notEmpty().withMessage('statu user is required'),
    check('statu_admin').notEmpty().withMessage('statu admin is required'),
    check('statu_car').notEmpty().withMessage('statu car is required'),
    check('icon_statu')
        .custom((value, { req }) => {
            if (!req?.files) {
                throw new Error('icon statu is require');
            }
            if (req?.files?.icon_statu?.mimetype !== 'image/svg+xml') {
                throw new Error('icon statu should be .svg')
            }
            return true;
        })
];

export const updateStatuValidation = [
    check('statu').isInt().withMessage('statu should be number'),
    check('statu_user').notEmpty().withMessage('statu user is required'),
    check('statu_admin').notEmpty().withMessage('statu admin is required'),
    check('statu_car').notEmpty().withMessage('statu car is required'),
]

export const updateIconStatuValidation = [
    check('icon_statu')
        .custom((value, { req }) => {
            if (!req?.files) {
                throw new Error('icon statu is require');
            }
            if (req?.files?.icon_statu?.mimetype !== 'image/svg+xml') {
                throw new Error('icon statu should be .svg')
            }
            return true;
        })
];

//promotions
export const addPromotionValidation = [
    check('titel').notEmpty().withMessage('title is required'),
    check('description').notEmpty().withMessage('description is required'),
    check('image')
        .custom((value, { req }) => {
            if (!req?.files) {
                throw new Error('image is required');
            }
            if (!req?.files?.image?.mimetype.startsWith('image/')) {
                throw new Error('image should be type image');
            }
            return true;
        }),
    check('discount_type').isString().isIn(['percent', 'currency']).withMessage('discount_type should be percent or currency'),
    check('discount').isFloat().withMessage('discount should be number'),
    check('min_rent_amount').isFloat().withMessage('min_rent_amount should be number'),
    check('start_date').isDate().withMessage('start_date should be yy-mm-dd'),
    check('end_date').isDate().withMessage('end_date should be yy-mm-dd')
];

export const TitelPromotionValidation = [
    check('titel').notEmpty().withMessage('title is required'),
    check('description').notEmpty().withMessage('description is required'),
    check('image')
        .custom((value, { req }) => {
            if (!req?.files) {
                throw new Error('image is required');
            }
            if (!req?.files?.image?.mimetype.startsWith('image/')) {
                throw new Error('image should be type image');
            }
            return true;
        }),
];

export const pricePromotionValidation = [
    check('discount_type').isString().isIn(['percent', 'currency']).withMessage('discount_type should be percent or currency'),
    check('discount').isFloat().withMessage('discount should be number'),
    check('min_rent_amount').isFloat().withMessage('min_rent_amount should be number')
];

export const datePromotionValidation = [
    check('start_date').isDate().withMessage('start_date should be yy-mm-dd'),
    check('end_date').isDate().withMessage('end_date should be yy-mm-dd')
];

//coupons
export const addCouponValidation = [
    check('user_id').notEmpty().withMessage('user_id is required'),
    check('description').notEmpty().withMessage('description is required'),
    check('discount').isFloat().withMessage('discount should be number'),
    check('start_date').isDate().withMessage('start date should be yy-mm-dd'),
    check('end_date').isDate().withMessage('end date should be yy-mm-dd'),
];

export const updateCouponValidation = [
    check('description').notEmpty().withMessage('description is required'),
    check('discount').isFloat().withMessage('discount is required'),
    check('start_date').isDate().withMessage('start date should be yy-mm-dd'),
    check('end_date').isDate().withMessage('end date should be yy-mm-dd')
];