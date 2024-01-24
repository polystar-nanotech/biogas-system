import Jwt from 'jsonwebtoken';

export const generateToken = (data) => {
  let token = Jwt.sign(data, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXP
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    const payload = Jwt.verify(token, process.env.JWT_SECRETE);
    return payload;

  } catch (error) {
    throw new Error("Your token has expired, login again!");
  }
}