import prisma from "../config/config.js";
import { sendError, sendSuccess } from "../service/reponseHandler.js";
import { uploadFile } from "../service/uploadService.js";

export const create = async (req, res) => {
  try {
    const { price, rentalId } = req.body;
    const image = req.files?.image;

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Invalid price format" });
    }

    const imageFileName = image ? await uploadFile(image) : null;

    const payment = await prisma.plyment.create({
      data: {
        price: parsedPrice,
        image: imageFileName,
        rentalId: rentalId,
      },
    });

    sendSuccess(res, "Successful Payment", payment);
  } catch (err) {
    console.error(err);
    sendError(res, "Error in Payment");
  }
};

export const list = async (req, res) => {
  try {
    const payment =await prisma.p
    sendSuccess(res, "SuccessFul", payment);
  } catch (err) {
    sendError(res, "Error paymen ");
  }
};

export const listBy = async (req, res) => {
  try {
    sendSuccess(res, "SuccessFul", payment);
  } catch (err) {
    sendError(res, "Error paymen ");
  }
};
export const update = async (req, res) => {
  try {
    sendSuccess(res, "SuccessFul", payment);
  } catch (err) {
    sendError(res, "Error paymen ");
  }
};
export const remove = async (req, res) => {
  try {
    sendSuccess(res, "SuccessFul", payment);
  } catch (err) {
    sendError(res, "Error paymen ");
  }
};
