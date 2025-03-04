import prisma from "../config/config.js";
import { sendError, sendSuccess } from "../service/reponseHandler.js";

// create
export const create = async (req, res) => {
  try {
    const { name, icon } = req.body;
    console.log(name);
    const bank = await prisma.bank.create({
      data: {
        name: name,
        icon: icon,
      },
    });
    sendSuccess(res, "Success Create", bank);
  } catch (erro) {
    console.log(erro);
    sendError(res, "Create insurance Error");
  }
};

// list
export const list = async (req, res) => {
  try {
    console.log("*************************************************");
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
        bank_id: id,
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
