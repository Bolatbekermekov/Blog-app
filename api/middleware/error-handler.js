import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../error/CustomApi.js";
export const errorHandlerMiddleware = (err, req, res, next) => {
  // console.error(err)
  // console.log(err);
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(customError.statusCode).json({ error: customError.msg });
  // }
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({success: false,error: customError.msg });
};
export const asyncError = (passedFunc) => (req, res, next) => {
  Promise.resolve(passedFunc(req, res, next)).catch(next);
};

export default errorHandlerMiddleware