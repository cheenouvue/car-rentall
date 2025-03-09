import prisma from "../config/config.js";
import {
  sendEmpty,
  sendError,
  sendSuccess,
} from "../service/reponseHandler.js";
import { removeFile, uploadFile } from "../service/uploadService.js";

// CREATE function - to create a new rental entry
export const create = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone,
      booking_pay,
      usersId,
      carId,
      employeesId,
      bankId,
    } = req.body;
    const passport = req.files?.passport;
    const identity_card = req.files?.identity_card;
    const dri_icenes = req.files?.dri_icenes;
    const pay_image = req.files?.pay_image;

    // Handle image uploads if present
    const passportFileName = passport ? await uploadFile(passport) : null;
    const identityCardFileName = identity_card
      ? await uploadFile(identity_card)
      : null;
    const driIcFileName = dri_icenes ? await uploadFile(dri_icenes) : null;
    const payImageFileName = pay_image ? await uploadFile(pay_image) : null;

    // Validate required fields
    if (
      !first_name ||
      !last_name ||
      !phone ||
      !booking_pay ||
      !usersId ||
      !carId ||
      !employeesId ||
      !bankId
    ) {
      return sendError(res, "Missing required fields.");
    }

    // Create the rental data in the database
    const rental = await prisma.rental.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        phone: parseInt(phone),
        passport: passportFileName,
        identity_card: identityCardFileName,
        dri_icenes: driIcFileName,
        pay_image: payImageFileName,
        booking_pay: parseFloat(booking_pay),
        usersId: usersId,
        carId: carId,
        employeesId: employeesId,
        bankId: bankId,
      },
    });

    return sendSuccess(res, "SuccessFul", rental);
  } catch (error) {
    console.error("Error creating rental:", error);
    return sendError(res, "Error creating rental: " + error.message);
  }
};

// LIST function - to get all rental entries
export const list = async (req, res) => {
  try {
    const rentals = await prisma.rental.findMany();
    return sendSuccess(res, "SuccessFul", rentals);
  } catch (error) {
    return sendError(res, "Error fetching rentals: ", error);
  }
};

// LIST BY ID function - to get a rental entry by ID
export const listBy = async (req, res) => {
  try {
    const { id } = req.params;
    const rental = await prisma.rental.findUnique({
      where: { id: id },
    });

    if (!rental) {
      return sendEmpty(res, "Rental not found.");
    }

    return sendSuccess(res, "SuccessFul", rental);
  } catch (error) {
    return sendError(res, "Error fetching rental by ID: ", error);
  }
};

// UPDATE function - to update a rental entry by ID
export const update = async (req, res) => {
  try {
    const { id } = req.params; // Extract id from URL params
    const {
      first_name,
      last_name,
      phone,
      booking_pay,
      usersId,
      carId,
      employeesId,
      bankId,
    } = req.body;
    const passport = req.files?.passport;
    const identity_card = req.files?.identity_card;
    const dri_icenes = req.files?.dri_icenes;
    const pay_image = req.files?.pay_image;

    // Get the existing rental data
    const check = await prisma.rental.findUnique({
      where: { id: id }, // Ensure `id` is parsed as an integer
    });

    if (!check) {
      return sendError(res, "Rental not found.");
    }

    // Handle file uploads if new files are provided, otherwise use existing files
    const passportFileName = passport
      ? await uploadFile(passport)
      : check.passport;
    const identityCardFileName = identity_card
      ? await uploadFile(identity_card)
      : check.identity_card;
    const driIcFileName = dri_icenes
      ? await uploadFile(dri_icenes)
      : check.dri_icenes;
    const payImageFileName = pay_image
      ? await uploadFile(pay_image)
      : check.pay_image;

    // Remove old files if new ones are uploaded
    if (passport && check.passport) removeFile(check.passport);
    if (identity_card && check.identity_card) removeFile(check.identity_card);
    if (dri_icenes && check.dri_icenes) removeFile(check.dri_icenes);
    if (pay_image && check.pay_image) removeFile(check.pay_image);

    // Update the rental data in the database
    const rental = await prisma.rental.update({
      where: { id: id }, // Ensure `id` is parsed as an integer
      data: {
        first_name,
        last_name,
        phone: parseInt(phone), // Ensure phone is an integer
        passport: passportFileName,
        identity_card: identityCardFileName,
        dri_icenes: driIcFileName,
        pay_image: payImageFileName,
        booking_pay: parseFloat(booking_pay), // Ensure booking_pay is a float
        usersId: usersId,
        carId: carId,
        employeesId: employeesId,
        bankId: bankId,
      },
    });

    return sendSuccess(res, "Rental updated successfully", rental);
  } catch (error) {
    console.error("Error updating rental:", error);
    return sendError(res, "Error updating rental: " + error.message);
  }
};

// REMOVE function - to delete a rental entry by ID
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await prisma.rental.findUnique({
      where: { id: id },
    });

    if (!check) {
      return sendEmpty(res, "Rental not found.");
    }

    // Delete the images if they exist
    if (check.passport) removeFile(check.passport);
    if (check.identity_card) removeFile(check.identity_card);
    if (check.dri_icenes) removeFile(check.dri_icenes);
    if (check.pay_image) removeFile(check.pay_image);

    // Delete the rental entry
    const rental = await prisma.rental.delete({
      where: { id: id },
    });

    return sendSuccess(res, "successfully.", rental);
  } catch (error) {
    return sendError(res, "Error deleting rental: ", error);
  }
};
