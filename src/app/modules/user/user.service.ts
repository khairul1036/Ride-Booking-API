import httpStatus from 'http-status-codes';
import AppError from '../../errorHelpers/AppError';
import { IAuthProvider, IUser, Role } from './user.interface';
import { User } from './user.model';
import { JwtPayload } from 'jsonwebtoken';
import hashedPassword from '../../utils/hashedPassword';

const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exits');
  }

  const securePassword = await hashedPassword(password as string);

  const authProvider: IAuthProvider = {
    provider: 'credentials',
    providerId: email as string,
  };

  const user = await User.create({
    ...rest,
    email,
    picture: payload?.picture,
    password: securePassword,
    auths: [authProvider],
  });
  return user;
};

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (payload.role) {
    if (decodedToken.role === Role.RIDER || decodedToken.role === Role.RIDER) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
    }

    if (payload.role === Role.RIDER && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
      if (decodedToken.role === Role.RIDER || decodedToken.role === Role.RIDER) {
        throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
      }
    }

    if (payload.password) {
      payload.password = await hashedPassword(payload.password);
    }

    const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {
      new: true,
    });

    return newUpdateUser;
  }
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const userServices = {
  createUserService,
  updateUser,
  getAllUsers,
};
