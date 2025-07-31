import mongoose from "mongoose";
import { Driver } from "./driver.model";
import { IDriver } from "./driver.interface";
import ApiError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

// Create a new driver profile
const createDriver = async (data: IDriver) => {
  const existingDriver = await Driver.findOne({ user: data.user });
  if (existingDriver) {
    throw new Error("Driver profile already exists for this user.");
  }

  const driver = await Driver.create(data);
  return driver;
};

// Retrieve all drivers with user info
const getAllDrivers = async () => {
  return await Driver.find().populate("user");
};

// Retrieve a single driver by ID
const getDriverById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid driver ID");
  }

  const driver = await Driver.findById(id).populate("user");
  if (!driver) {
    throw new ApiError(httpStatus.NOT_FOUND, "Driver not found");
  }

  return driver;
};

// Update driver approval status
const updateDriverApproval = async (id: string, isApproved: boolean) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid driver ID");
  }

  const driver = await Driver.findByIdAndUpdate(
    id,
    { isApproved },
    { new: true }
  ).populate("user");

  if (!driver) {
    throw new ApiError(httpStatus.NOT_FOUND, "Driver not found");
  }

  return driver;
};

// Update driver's availability
const updateDriverAvailability = async (
  driverId: string,
  isAvailable: boolean
) => {
  if (!mongoose.Types.ObjectId.isValid(driverId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid driver ID");
  }

  const driver = await Driver.findByIdAndUpdate(
    driverId,
    { isAvailable },
    { new: true }
  ).populate("user");

  if (!driver) {
    throw new ApiError(httpStatus.NOT_FOUND, "Driver not found");
  }

  return driver;
};

// Delete driver
const deleteDriver = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid driver ID");
  }

  const driver = await Driver.findByIdAndDelete(id);
  if (!driver) {
    throw new ApiError(httpStatus.NOT_FOUND, "Driver not found");
  }

  return driver;
};

export const driverService = {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriverApproval,
  updateDriverAvailability,
  deleteDriver,
};
