import Jwt from 'jsonwebtoken';
export const generateToken = (data) => {
  let token = Jwt.sign(data, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXP
  });
  return token;
};
