import prisma from "../config/config.js";
import { validationResult } from "express-validator";
import { sendCreated, sendDelete, sendEmpty, sendError, sendExsited, sendSuccess, sendUpdate, sendValidator } from "../service/reponseHandler.js";

//create new coupon
export const addCoupon = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return sendValidator(res, error);
    }
    try {
        const { user_id, description, discount, start_date, end_date } = req.body;
        const user = await prisma.users.findUnique({ where: { id: user_id } });
        if (!user) {
            return sendEmpty(res, 'user not found');
        }

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const length = 8;
        let coupon = '';
        for (let i = 0; i < length; i++) {
            coupon += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        console.log(coupon);
        const addCoupon = await prisma.coupons.create({
            data: { user_id, code: coupon, description, discount: parseFloat(discount), start_date: new Date(start_date), end_date: new Date(end_date) }
        });
        sendCreated(res, 'create new coupon successfully', addCoupon);
    } catch (error) {
        sendError(res, error);
    }

}

//get all coupons
export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await prisma.coupons.findMany({
            include: {
                user: true
            }
        });
        sendSuccess(res, 'get all coupons successfully', coupons);
    } catch (error) {
        sendError(res, error);
    }
}

//get one coupon
export const getOneCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await prisma.coupons.findUnique({ where: { id } });
        if (!coupon) {
            return sendEmpty(res, 'coupon not found');
        }
        sendSuccess(res, 'get one coupon successfully', coupon);
    } catch (error) {
        sendError(res, error);
    }
}

//update statu to active
export const updateStatuActive = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await prisma.coupons.findUnique({ where: { id } });
        if (!coupon) {
            return sendEmpty(res, 'coupon not found');
        }
        if (coupon.status === 'active') {
            return sendExsited(res, 'statu is same');
        }
        await prisma.coupons.update({
            where: { id },
            data: { status: 'active' }
        });
        sendUpdate(res, 'update statu to active successfully');
    } catch (error) {
        sendError(res, error);
    }
}

//update statu to inactive
export const updateStatuInactive = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await prisma.coupons.findUnique({ where: { id } });
        if (!coupon) {
            return sendEmpty(res, 'coupon not found');
        }
        if (coupon.status === 'inactive') {
            return sendExsited(res, 'statu is same');
        }
        await prisma.coupons.update({
            where: { id },
            data: { status: 'inactive' }
        });
        sendUpdate(res, 'update statu to inactive successfully');
    } catch (error) {
        sendError(res, error);
    }
}

//update statu to expired
export const updateStatuExpired = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await prisma.coupons.findUnique({ where: { id } });
        if (!coupon) {
            return sendEmpty(res, 'coupon not found');
        }
        if (coupon.status === 'expired') {
            return sendExsited(res, 'statu is same');
        }
        await prisma.coupons.update({
            where: { id },
            data: { status: 'expired' }
        });
        sendUpdate(res, 'update statu to expired successfully');
    } catch (error) {
        sendError(res, error);
    }
}

//update coupon
export const updateCoupon = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return sendValidator(res, error);
    }
    try {
        const { id } = req.params;
        const { description, discount, start_date, end_date } = req.body;
        const coupon = await prisma.coupons.findUnique({ where: { id } });
        if (!coupon) {
            return sendEmpty(res, 'coupon not found');
        }
        await prisma.coupons.update({
            where: { id },
            data: { description, discount: parseFloat(discount), start_date: new Date(start_date), end_date: new Date(end_date) }
        });
        sendUpdate(res, 'update coupon successfully');
    } catch (error) {
        sendError(res, error);
    }
}

//delete coupon
export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await prisma.coupons.findUnique({ where: { id } });
        if (!coupon) {
            return sendEmpty(res, 'coupon not found');
        }
        await prisma.coupons.delete({ where: { id } });
        sendDelete(res, 'delete coupon successfully');
    } catch (error) {
        sendError(res, error);
    }
}