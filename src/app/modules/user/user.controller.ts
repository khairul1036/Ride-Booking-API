import httpStatus from 'http-status-codes';
import { userServices } from './user.service';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    picture: req.file?.path,
  };
  const user = await userServices.createUserService(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User create successfully',
    data: user,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    picture: req.file?.path,
  };

  const userId = req.params.id;
  const verifiedToken = req.user;

  const user = await userServices.updateUser(userId, payload, verifiedToken as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User update successfully',
    data: user,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieved successfully',
    data: users,
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload
    const result = await userServices.getMe(decodedToken.userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your profile Retrieved Successfully",
        data: result.data
    })
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSingleUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await userServices.getSingleUser(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Retrieved Successfully",
        data: result.data
    })
})

export const UserControllers = {
  createUser,
  updateUser,
  getAllUsers,
  getMe,
  getSingleUser
};
