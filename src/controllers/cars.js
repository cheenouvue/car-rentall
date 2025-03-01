import prisma from "../config/config.js";
import { sendError, sendSuccess } from "../service/reponseHandler.js";

//create
export const create = async (req, res) => {
  try {
    const {
      name,
      image,
      year,
      plate_city,
      plate_text,
      plate_number,
      gps,
      car_seat,
      car_gear,
      color,
      status,
      price,
      carTypeId,
      insuranceId,
      bankId,
    } = req.body;
    const car = await prisma.car.create({
      data: {
        name: name,
        image: image,
        year: year,
        plate_city: plate_city,
        plate_text: plate_text,
        plate_number: plate_number,
        gps: gps,
        car_seat: car_seat,
        car_gear: car_gear,
        color: color,
        status: status,
        price: price,
        carTypeId: carTypeId,
        insuranceId: insuranceId,
        bankId: bankId,
      },
    });
    sendSuccess(res, "Success", car);
  } catch (err) {
    console.log(err);
    sendError(res, "Car Erro ");
  }
};

// list
export const list = async (req, res) => {
  try {
    const car = await prisma.car.findMany({
      include: {
        carType: {
          select: {
            name: true,
            icon: true,
          },
        },
        insurance: {
          select: {
            name: true,
            icon: true,
          },
        },
        bank: {
          select: {
            name: true,
            icon: true,
          },
        },
      },
    });
    sendSuccess(res, "Success", car);
  } catch (err) {
    console.log(err);
    sendError(res, "Car Erro ");
  }
};

// listby 
export const listBy = async (req, res) => {
  try {
    
    sendSuccess(res, "Success", car);
  } catch (err) {
    console.log(err);
    sendError(res, "Car Erro ");
  }
};

export const update = async (req, res) => {
  try {
    sendSuccess(res, "Success", car);
  } catch (err) {
    console.log(err);
    sendError(res, "Car Erro ");
  }
};
export const remove = async (req, res) => {
  try {
    sendSuccess(res, "Success", car);
  } catch (err) {
    console.log(err);
    sendError(res, "Car Erro ");
  }
};
