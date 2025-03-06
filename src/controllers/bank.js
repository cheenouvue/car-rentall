import prisma from "../config/config.js";
import { sendError, sendSuccess } from "../service/reponseHandler.js";
import { uploadFile } from "../service/uploadService.js";
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
    const { name, icon } = req.body;
    const bank = await prisma.bank.update({
      where: {
        bank_id: id,
      },
      data: {
        name: name,
        icon: icon,
      },
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
    const bank = await prisma.bank.delete({
      where: {
        bank_id: id,
      },
    });

    sendSuccess(res, "Success", bank);
  } catch (erro) {
    console.log(erro);
    sendError(res, "Delete bank Error");
  }
};
