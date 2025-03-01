import prisma from "../config/config.js";
import { sendError, sendSuccess } from "../service/reponseHandler.js";

// create
export const create = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const carType = await prisma.carType.create({
      data: {
        name: name,
        icon: icon,
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
    const { name, icon } = req.body;
    const carType = await prisma.carType.update({
      where: {
        car_type_id: id,
      },
      data: {
        name: name,
        icon: icon,
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
    const carType = await prisma.carType.delete({
      where: {
        car_type_id: id,
      },
    });

    sendSuccess(res, "Success", carType);
  } catch (erro) {
    console.log(erro);
    sendError(res, "Delete carType Error");
  }
};
