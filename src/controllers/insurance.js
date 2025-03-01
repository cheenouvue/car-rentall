import prisma from "../config/config.js";
import {
  sendCreated,
  sendError,
  sendSuccess,
} from "../service/reponseHandler.js";
export const create = async (req, res) => {
  try {
    const { name, icon } = await req.body;
    const insurance = await prisma.insurance.create({
      data: {
        name: name,
        icon: icon,
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
    sendSuccess(res, "success", insurance);
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
        insurance_id: id,
      },
    });
    sendSuccess(res, "success", insurance);
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ message: "ListID insurance Error " });
  }
};
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon } = req.body;
    const insurance = await prisma.insurance.update({
      where: {
        insurance_id: id,
      },
      data: {
        name: name,
        icon: icon,
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
    const insurance = await prisma.insurance.delete({
      where: {
        insurance_id: id,
      },
    });
    sendSuccess(res, "Success Delete", insurance);
  } catch (erro) {
    console.log(erro);
    res.json({ message: "remove insurance Error " });
  }
};
