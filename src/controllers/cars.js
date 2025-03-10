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
    const {
      name,
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
    } = req.body;
    const image = req.files?.image;
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Invalid price format" });
    }
    const imageFileName = image ? await uploadFile(image) : null;
    const car = await prisma.car.create({
      data: {
        name: name,
        image: imageFileName,
        year: year,
        plate_city: plate_city,
        plate_text: plate_text,
        plate_number: plate_number,
        gps: gps,
        car_seat: car_seat,
        car_gear: car_gear,
        color: color,
        status: status,
        price: parsedPrice,
        carTypeId: carTypeId,
        insuranceId: insuranceId,
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

// List cars by price range
export const listPrice = async (req, res) => {
  try {
    const { min_price, max_price } = req.body;

    let whereCondition = {};

    // Apply price filter only if min_price or max_price is provided
    if (min_price !== undefined || max_price !== undefined) {
      whereCondition.price = {};

      if (min_price !== undefined) {
        whereCondition.price.gte = parseFloat(min_price); // Convert to float
      }
      if (max_price !== undefined) {
        whereCondition.price.lte = parseFloat(max_price); // Convert to float
      }
    }

    // Find cars based on the filter
    const cars = await prisma.car.findMany({
      where: whereCondition,
    });

    // Check if no cars were found
    if (cars.length === 0) {
      return sendEmpty(res, "No car");
    }

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
    } = req.body;
    const image = req.files?.image;
    const check = await prisma.car.findUnique({
      id: id,
    });
    if (!check) return sendEmpty(res, "Not Date");
    const imageFileName = image ? await uploadFile(image) : check.image;
    if (image && imageFileName) removeFile(check.image);
    const car = await prisma.car.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        image: imageFileName,
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
    const check = await prisma.car.findUnique({
      where: {
        id: id,
      },
    });
    if (!check) return sendEmpty(res, "NO Data");
    if (check.image) removeFile(check.image);
    const car = await prisma.car.delete({
      where: {
        id: id,
      },
    });
    sendSuccess(res, "Success", car);
  } catch (err) {
    console.log(err);
    sendError(res, "Car Erro ");
  }
};
