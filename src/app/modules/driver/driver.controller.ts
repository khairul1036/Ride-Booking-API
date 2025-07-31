import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { driverService } from "./driver.service";


const createDriver = catchAsync(async (req: Request, res: Response) => {

  const driver = await driverService.createDriver(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Driver created successfully",
    data: driver,
  });
});

const getAllDrivers = catchAsync(async (_req: Request, res: Response) => {
  const drivers = await driverService.getAllDrivers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All drivers retrieved successfully",
    data: drivers,
  });
});

const getDriverById = catchAsync(async (req: Request, res: Response) => {
  const driver = await driverService.getDriverById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Driver retrieved successfully",
    data: driver,
  });
});

const updateApproval = catchAsync(async (req: Request, res: Response) => {
  const { isApproved } = req.body;
  const driver = await driverService.updateDriverApproval(
    req.params.id,
    isApproved
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Driver approval status updated successfully",
    data: driver,
  });
});

const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  const result = req.body;

  const user = req.user as JwtPayload;
  const driver = await driverService.updateDriverAvailability(
    user.userId,
    result.data.isAvailable
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Driver availability updated successfully",
    data: driver,
  });
});

const deleteDriver = catchAsync(async (req: Request, res: Response) => {
  await driverService.deleteDriver(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: "Driver deleted successfully",
    data: null,
  });
});

export const DriverController = {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateApproval,
  updateAvailability,
  deleteDriver,
};
