import { LoginUserObject } from '../validators';
import { formatValidationErrors } from '../utils';

export const ValidateLoginData = (req, res, next) => {
  const body = req.body;
  const validateBody = LoginUserObject.safeParse(body);
  if (!validateBody.success) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: formatValidationErrors(validateBody.error.issues)
    });
  } else {
    req.body = validateBody.data;
    next();
  }
};
