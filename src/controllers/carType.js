import prisma from "../config/config.js";
import {
  sendEmpty,
  sendError,
  sendSuccess,
} from "../service/reponseHandler.js";
import { removeFile, uploadFile } from "../service/uploadService.js";

// create
export const create = async (req, res) => {
  try {
    const { name } = req.body;
    const icon = req.files?.icon;
    const iconFileName = icon ? await uploadFile(icon) : null;
    const carType = await prisma.carType.create({
      data: {
        name: name,
        icon: iconFileName,
      },
    });
    sendSuccess(res, "Success Create", carType);
  } catch (erro) {
    console.log(erro);
    sendError(res, "Create insurance Error");
  }
};

// list
export const list = async (req, res) => {
  try {
    const carType = await prisma.carType.findMany();
    sendSuccess(res, "Success list", carType);
  } catch (erro) {
    console.log(erro);
    sendError(res, "List carType Error");
  }
};

//listID
export const listID = async (req, res) => {
  try {
    const { id } = req.params;

    const carType = await prisma.carType.findUnique({
      where: {
        car_type_id: id,
      },
    });
    if (!carType) return sendEmpty(res, "No image");
    sendSuccess(res, "Success", carType);
  } catch (erro) {
    console.log(erro);
    sendError(res, "ListID carType Error");
  }
};

//update
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const icon = req.files?.icon;
    const check = await prisma.carType.findUnique({
      where: {
        id: id,
      },
    });
    if (!check) return sendEmpty(res, "NO Date");

    const iconFileName = icon ? await uploadFile(icon) : check.icon;
    if (icon && check.icon) removeFile(check.icon);
    const carType = await prisma.carType.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        icon: iconFileName,
      },
    });
    sendSuccess(res, "Success", carType);
  } catch (erro) {
    console.log(erro);
    sendError(res, "ListID carType Error");
  }
};

//remove
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await prisma.carType.findUnique({
      where: {
        id: id,
      },
    });
    if (!check) return sendEmpty(res, "NO Date");
    if (check.icon) removeFile(check.icon);
    const carType = await prisma.carType.delete({
      where: {
        id: id,
      },
    });

    sendSuccess(res, "Success Delete", carType);
  } catch (erro) {
    console.log(erro);
    sendError(res, "Delete carType Error");
  }
};
