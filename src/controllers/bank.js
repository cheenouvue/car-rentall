import prisma from "../config/config.js";
import {
  sendEmpty,
  sendError,
  sendSuccess,
} from "../service/reponseHandler.js";
import { removeFile, uploadFile } from "../service/uploadService.js";
import fs from "fs";
import path from "path";
export const create = async (req, res) => {
  try {
    const { name } = req.body;
    const icon = req.files?.icon;
    const image = req.files?.image;
    const iconFilename = icon ? await uploadFile(icon) : null;
    const imageFilename = image ? await uploadFile(image) : null;

    const bank = await prisma.bank.create({
      data: {
        name: name,
        icon: iconFilename,
        image: imageFilename,
      },
    });

    sendSuccess(res, "Successfully created bank entry", bank);
  } catch (error) {
    console.error(error);
    sendError(res, "Error creating bank entry");
  }
};

// list
export const list = async (req, res) => {
  try {
    const bank = await prisma.bank.findMany();
    sendSuccess(res, "Success list", bank);
  } catch (erro) {
    console.log(erro);
    sendError(res, "List bank Error");
  }
};

//listID
export const listID = async (req, res) => {
  try {
    const { id } = req.params;
    const bank = await prisma.bank.findUnique({
      where: {
        id: id,
      },
    });
    if (!bank) {
      return sendEmpty(res, "NO Image");
    }
    sendSuccess(res, "Success", bank);
  } catch (erro) {
    console.log(erro);
    sendError(res, "ListID bank Error");
  }
};

//update
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const icon = req.files?.icon;
    const image = req.files?.image;
    const bankCheck = await prisma.bank.findUnique({ where: { id: id } });
    if (!bankCheck) return res.status(400).json({ message: "NO Date" });

    const iconFileName = icon ? await uploadFile(icon) : bankCheck.icon;
    const imageFileName = image ? await uploadFile(image) : bankCheck.image;

    if (icon && bankCheck.icon) removeFile(bankCheck.icon);
    if (image && bankCheck.image) removeFile(bankCheck.image);

    const bank = await prisma.bank.update({
      where: { id: id },
      data: { name, icon: iconFileName, image: imageFileName },
    });

    sendSuccess(res, "Success", bank);
  } catch (erro) {
    console.log(erro);
    sendError(res, "ListID bank Error");
  }
};

//remove
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const bankCheck = await prisma.bank.findUnique({ where: { id: id } });
    if (!bankCheck) return sendEmpty(res, "NO Date");

    if (bankCheck.icon) removeFile(bankCheck.icon);
    if (bankCheck.image) removeFile(bankCheck.image);
    const bank = await prisma.bank.delete({
      where: {
        id: id,
      },
    });
    sendSuccess(res, "Success Delete", bank);
  } catch (erro) {
    console.log(erro);
    sendError(res, "Delete bank Error");
  }
};
