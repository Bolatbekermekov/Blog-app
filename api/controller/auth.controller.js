import User from "../models/user.js"
// import ErrorHandler from "../error/CustomApi.js";
import BadRequestError from "../error/bad-request.js";
import { StatusCodes } from "http-status-codes";
import { asyncError } from "../middleware/error-handler.js";
export const signup = asyncError( async(req,res,next)=>{
  const {username,email,password} = req.body
    if (!email || !password || !username) {
      throw new BadRequestError("Please provide name, email, and password");
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      throw new BadRequestError("Email Already Exist");
    }

    const user = await User.create({ username, email, password });
    const tokenUser = { userId: user._id, username: user.username, email: user.email };
    res.staus(StatusCodes.OK).json({ user: tokenUser });
 
})


export default signup