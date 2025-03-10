import prisma from "../config/config.js";
import {
  sendEmpty,
  sendError,
  sendSuccess,
} from "../service/reponseHandler.js";

// Create a Review
export const create = async (req, res) => {
  try {
    const { comment, carPoint, emplyPoint, emplyId, carId, rentalId } =
      req.body;
    const review = await prisma.review.create({
      data: {
        comment: comment,
        carPoint: parseInt(carPoint),
        emplyPoint: parseInt(emplyPoint),
        emplyId: emplyId,
        carId: carId,
        rentalId: rentalId,
      },
    });
    sendSuccess(res, "Successful", review);
  } catch (err) {
    sendError(res, "Error creating review");
  }
};

// List All Reviews
export const list = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      select: {
        comment: true,
        carPoint: true,
        emplyPoint: true,
        rentalId: true,
        car: {
          select: {
            name: true,
          },
        },
      },
    });
    sendSuccess(res, "Successful", reviews);
  } catch (err) {
    sendError(res, "Error retrieving reviews");
  }
};

// Get Review By ID
export const listBy = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await prisma.review.findUnique({
      where: { id },
    });

    review ? sendSuccess(res, "Successful", review) : sendEmpty(res, "No Data");
  } catch (err) {
    sendError(res, "Error retrieving review");
  }
};

// Update Review
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, carPoint, emplyPoint, emplyId, carId, rentalId } =
      req.body;
    const check = await prisma.review.findUnique({ where: { id } });
    if (!check) return sendEmpty(res, "No Data");

    const review = await prisma.review.update({
      where: { id },
      data: {
        comment: comment,
        carPoint: parseInt(carPoint),
        emplyPoint: parseInt(emplyPoint),
        emplyId: emplyId,
        carId: carId,
        rentalId: rentalId,
      },
    });

    sendSuccess(res, "Successful", review);
  } catch (err) {
    sendError(res, "Error updating review");
  }
};

// Delete Review
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await prisma.review.findUnique({ where: { id } });
    if (!check) return sendEmpty(res, "No Data");

    await prisma.review.delete({ where: { id } });

    sendSuccess(res, "Review deleted successfully");
  } catch (err) {
    sendError(res, "Error deleting review");
  }
};
