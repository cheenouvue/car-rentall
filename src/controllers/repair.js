import prisma from "../config/config.js";
import {
  sendEmpty,
  sendError,
  sendSuccess,
} from "../service/reponseHandler.js";
import { removeFile, uploadFile } from "../service/uploadService.js";
//create
export const create = async (req, res) => {
  try {
    const { penaltyTail, penaltyPrice, detail, pay } = req.body;
    const penaltyImg = req.files?.penaltyImg;
    const image = req.files?.image;

    const parsedpenaltyPrice = parseFloat(penaltyPrice);
    if (isNaN(parsedpenaltyPrice)) {
      return res
        .status(400)
        .json({ message: "Invalid price format penaltyPrice" });
    }
    const parsedpay = parseFloat(pay);
    if (isNaN(parsedpay)) {
      return res
        .status(400)
        .json({ message: "Invalid price format parsedpay" });
    }

    const imageFileName = image ? await uploadFile(image) : null;
    const penaltyFileName = penaltyImg ? await uploadFile(penaltyImg) : null;

    const repair = await prisma.repair.create({
      data: {
        penaltyImg: penaltyFileName,
        penaltyTail: penaltyTail,
        penaltyPrice: parsedpenaltyPrice,
        image: imageFileName,
        detail: detail,
        pay: parsedpay,
      },
    });

    sendSuccess(res, "Successful repair", repair);
  } catch (err) {
    console.error(err);
    sendError(res, "Error in repair");
  }
};

//list
export const list = async (req, res) => {
  try {
    const repair = await prisma.repair.findMany();
    sendSuccess(res, "SuccessFul", repair);
  } catch (err) {
    sendError(res, "Error paymen ");
  }
};

//listById
export const listBy = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Requested ID:", id);

    const repair = await prisma.repair.findUnique({
      where: { id },
    });

    console.log("repair Data:", repair);

    repair
      ? sendSuccess(res, "SuccessFul", repair)
      : sendEmpty(res, "Not Data");
  } catch (err) {
    console.error("Error fetching repair:", err);
    sendError(res, "Error repair");
  }
};

//updata
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { penaltyTail, penaltyPrice, detail, pay } = req.body;
    const penaltyImg = req.files?.penaltyImg;
    const image = req.files?.image;

    const check = await prisma.repair.findUnique({
      where: {
        id: id,
      },
    });
    if (!check) return sendEmpty(res, "No Data");
    const parsedpenaltyPrice = parseFloat(penaltyPrice);
    if (isNaN(parsedpenaltyPrice)) {
      return res
        .status(400)
        .json({ message: "Invalid price format penaltyPrice" });
    }
    const parsedpay = parseFloat(pay);
    if (isNaN(parsedpay)) {
      return res
        .status(400)
        .json({ message: "Invalid price format parsedpay" });
    }

    const imageFileName = image ? await uploadFile(image) : check.image;

    const penaltyFileName = penaltyImg
      ? await uploadFile(penaltyImg)
      : check.penaltyImg;

    if (image && check.image) removeFile(check.image);
    if (penaltyImg && check.penaltyImg) removeFile(check.penaltyImg);

    const repair = await prisma.repair.update({
      where: {
        id: id,
      },
      data: {
        penaltyImg: penaltyFileName,
        penaltyTail: penaltyTail,
        penaltyPrice: parsedpenaltyPrice,
        image: imageFileName,
        detail: detail,
        pay: parsedpay,
      },
    });

    sendSuccess(res, "SuccessFul Update", repair);
  } catch (err) {
    sendError(res, "Error paymen ");
  }
};

//remove
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await prisma.repair.findUnique({
      where: {
        id: id,
      },
    });
    if (!check) return sendEmpty(res, "No Data");
    if (check.image) removeFile(check.image);
    if (check.penaltyImg) removeFile(check.penaltyImg);
    const repair = await prisma.repair.delete({
      where: {
        id: id,
      },
    });
    sendSuccess(res, "SuccessFul", repair);
  } catch (err) {
    sendError(res, "Error paymen ");
  }
};
