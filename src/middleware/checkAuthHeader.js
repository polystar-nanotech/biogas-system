import { verifyToken } from "../utils";

export const CheckAndVerifyAuthHeader = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(401).json({
      statusCode: 401,
      message: "Not authenticated, please login!"
    });
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: "Not authenticated, please login!"
    });
  }

  try {
    const data = verifyToken(token);
    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({ statusCode: 401, message: error.message })
  }
} 