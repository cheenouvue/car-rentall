import prisma from "../config/config.js";
import {
  sendCreated,
  sendEmpty,
  sendError,
  sendSuccess,
} from "../service/reponseHandler.js";
import { removeFile, uploadFile } from "../service/uploadService.js";
export const create = async (req, res) => {
  try {
    const { name } = req.body;
    const icon = req.files?.icon;
    const iconFileName = icon ? await uploadFile(icon) : null;
    const insurance = await prisma.insurance.create({
      data: {
        name: name,
        icon: iconFileName,
      },
    });
    sendCreated(res, " SuccessFull", insurance);
  } catch (erro) {
    console.log(erro);
    sendError(res, "Create insurance Error");
  }
};

export const list = async (req, res) => {
  try {
    const insurance = await prisma.insurance.findMany({});
    sendCreated(res, " SuccessFull", insurance);
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ message: "List insurance Error " });
  }
};
export const listID = async (req, res) => {
  try {
    const { id } = req.params;
    const insurance = await prisma.insurance.findUnique({
      where: {
        id: id,
      },
    });
    insurance
      ? sendSuccess(res, "success", insurance)
      : sendEmpty(res, "NO Date");
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ message: "ListID insurance Error " });
  }
};
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const name = req.body;
    const icon = req.files?.icon;
    const check = await prisma.insurance.findUnique({
      where: { id: id },
    });
    if (!check) return sendEmpty(res, "NO Date");
    const iconFileName = icon ? await uploadFile(icon) : check.icon;
    if (icon && check.icon) removeFile(check.icon);
    const insurance = await prisma.insurance.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        icon: iconFileName,
      },
    });
    sendSuccess(res, "Success Update ", insurance);
  } catch (erro) {
    console.log(erro);
    res.json({ message: "updateinsurance Error " });
  }
};
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await prisma.insurance.findUnique({
      where: { id: id },
    });
    if (!check) return sendEmpty(res, "NO Date");
    if (check.icon) removeFile(bankCheck.icon);
    const insurance = await prisma.insurance.delete({
      where: {
        id: id,
      },
    });
    sendSuccess(res, "Success Delete", insurance);
  } catch (erro) {
    console.log(erro);
    res.json({ message: "remove insurance Error " });
  }
};
