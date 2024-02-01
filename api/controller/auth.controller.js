import User from "../models/user.js"
// import ErrorHandler from "../error/CustomApi.js";
import BadRequestError from "../error/bad-request.js";
import { StatusCodes } from "http-status-codes";
import { asyncError } from "../middleware/error-handler.js";
import createTokenUser from "../utils/createToken.js";
import attachCookiesToResponse from "../utils/jwt.js";
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
    res.status(StatusCodes.OK).json({ user: tokenUser });
 
})
export const login = asyncError(async (req, res,next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new BadRequestError('Invalid Credentials');
  }

  const tokenUser = createTokenUser(user);


  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
})

export const google = asyncError(async (req,res,next)=>{
  const {email,username,googlePhotoUrl} =req.body
  const user = await User.findOne({email})
  if (user) {
   const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser }); 
}else{
  const generatedPassword =
  Math.random().toString(36).slice(-8) +
  Math.random().toString(36).slice(-8);
const newUser = new User({
  username:
  username.toLowerCase().split(' ').join('') +
    Math.random().toString(9).slice(-4),
  email,
  password: generatedPassword,
  profilePicture: googlePhotoUrl,
});
await newUser.save();
const tokenUser = createTokenUser(user);

attachCookiesToResponse({ res, user: tokenUser });

res.status(StatusCodes.OK).json({ user: tokenUser }); }

})
export default signup