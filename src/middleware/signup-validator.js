import { RegisterUserObject } from '../validators';
import { formatValidationErrors } from '../utils';

export const ValidateData = (req, res, next) => {
  const body = req.body;
  console.log(body)
  const validateBody = RegisterUserObject.safeParse(body);
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
