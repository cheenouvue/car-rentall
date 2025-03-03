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
    const { plate_city, plate_text, plate_number } = req.body;

    // Build a dynamic filter object
    const filter = {};
    if (plate_city) filter.plate_city = plate_city;
    if (plate_text) filter.plate_text = plate_text;
    if (plate_number) filter.plate_number = plate_number;

    // Find cars based on filters
    const car = await prisma.car.findMany({
      where: filter,
    });

    sendSuccess(res, "Success", car);
  } catch (err) {
    console.error(err);
    sendError(res, "Car Error");
  }
};

//list by price
export const listPrice = async (req, res) => {
  try {
    const { min_price, max_price } = req.body;

    let whereCondition = {};

    // Apply price filter only if min_price or max_price is provided
    if (min_price !== undefined || max_price !== undefined) {
      whereCondition.price = {};

      if (min_price !== undefined) {
        whereCondition.price.gte = min_price; // Greater than or equal to min_price
      }
      if (max_price !== undefined) {
        whereCondition.price.lte = max_price; // Less than or equal to max_price
      }
    }

    // Find cars based on the filter
    const cars = await prisma.car.findMany({
      where: whereCondition,
    });

    sendSuccess(res, "Success", cars);
  } catch (err) {
    console.error(err);
    sendError(res, "Car Price Error");
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
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
    const car = await prisma.car.update({
      where: {
        car_id: id,
      },
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

//remove
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await prisma.car.delete({
      where: {
        car_id: id,
      },
    });
    sendSuccess(res, "Success", car);
  } catch (err) {
    console.log(err);
    sendError(res, "Car Erro ");
  }
};
