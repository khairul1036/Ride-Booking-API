/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import AppError from '../errorHelpers/AppError';
import { handleCastError } from '../helpers/handleCastError';
import { handlerValidationError } from '../helpers/handlerValidationError';
import { handlerZodError } from '../helpers/handlerZodError';
import { TErrorSources } from '../interfaces/error.types';
import envVars from '../config/env';
import { handlerDuplicateError } from '../helpers/handlerDuplicateError';
import { deleteImageFromCLoudinary } from '../config/cloudinary.config';

const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (envVars.NODE_ENV === 'development') {
    console.log(err);
  }

  if (req.file) {
    await deleteImageFromCLoudinary(req.file.path);
  }

  if (req.files && Array.isArray(req.files) && req.files.length) {
    const imageUrls = (req.files as Express.Multer.File[]).map((file) => file.path);

    await Promise.all(imageUrls.map((url) => deleteImageFromCLoudinary(url)));
  }

  let errorSources: TErrorSources[] = [];
  let statusCode = 500;
  let message = 'Something Went Wrong!!';

  //Duplicate error
  if (err.code === 11000) {
    const simplifiedError = handlerDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // Object ID error / Cast Error
  else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // Zod Error
  else if (err.name === 'ZodError') {
    const simplifiedError = handlerZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as TErrorSources[];
  }

  //Mongoose Validation Error
  else if (err.name === 'ValidationError') {
    const simplifiedError = handlerValidationError(err);
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources as TErrorSources[];
    message = simplifiedError.message;
  }

  // Application Error
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: envVars.NODE_ENV === 'development' ? err : null,
    stack: envVars.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
