import { NextFunction, Request, Response } from "express";
import ApiError from "@/utils/apiError";
import { UniqueConstraintError, ValidationError } from "sequelize";

/**
 * @function errorHandlerMiddleware
 * @description Express error handler middleware
 * @param {Error} err - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Response} - Response object
 */
const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ApiError;

  // check if error is an instance of ApiError
  if (!(err instanceof ApiError)) {
    if (err instanceof ValidationError) {
      // Handle Sequelize validation error
      const errors = err.errors.map((error) => ({
        [error.path ?? "field"]: error.message,
      }));

      error = new ApiError({
        status: 400,
        message: errors[0][Object.keys(errors[0])[0]],
        errors,
        stack: err.stack,
      });
    } else if (err instanceof UniqueConstraintError) {
      const errors = err.errors.map((error) => ({
        [error.path ?? "field"]: error.message,
      }));

      error = new ApiError({
        status: 400,
        message: errors[0][Object.keys(errors[0])[0]],
        errors,
        stack: err.stack,
      });
    } else {
      error = new ApiError({
        status: 500,
        message: "Something went wrong",
        errors: [
          {
            message: err.message,
          },
        ],
        stack: err.stack,
      });
    }
  } else {
    error = new ApiError({
      status: err.status,
      message: err.message,
      errors: err.errors,
      stack: err.stack,
    });
  }

  const response = {
    ...error,
    message: error.message,
    errors: error.errors,
  };

  console.error("Error: ", error.message);

  res.status(error.status).json(response);
  next();
  return;
};

export default errorHandlerMiddleware;
