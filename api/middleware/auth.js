import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { asyncError } from "../middleware/error-handler.js";
import BadRequestError from "../error/bad-request.js";

export const isAuthenticated = asyncError(async (req, res, next) => {
  // const token = req.cookies.token;

  const { token } = req.cookies;

  if (!token) { 
     throw new BadRequestError("Not Logged In");//401
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData._id);

  // req.user = await User.findOne({ email:"Test@test.com" })
  // req.user = await User.findOne({ email:"Baha@test.com" })

  next();
});

export const isAdmin = asyncError(async (req, res, next) => {
  if (req.user.role !== "admin"){
        throw new BadRequestError("Only Admin allowed");//401
  }

  next();
});
