import jwt from 'jsonwebtoken'
export const createJWT = ({payload}) =>{
  const token = jwt.sign(payload,process.env.JWT_SECRET,{
    // expiresIn: process.env.JWT_LIFETIME,

  }

  )
  return token;

}

export const attachCookiesToResponse = ({ res, user }) => {
  const accessTokenJWT = createJWT({ payload: { user } });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });
  
};
export default attachCookiesToResponse