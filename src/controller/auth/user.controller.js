import {
  comparePassword,
  db,
  generateToken,
  generateAndReturnUUID,
  hashPassword
} from '../../utils';

// User controller to handle user registration
export const CreateUser = async (req, res) => {
  const body = req.body;
  // Check if user phone number already exists
  const userExists = await db.user.findFirst({ where: { telephone: body.telephone } });
  if (userExists) {
    return res
      .status(409)
      .json({ statusCode: 409, success: false, message: 'Phone number is already taken.' });
  }

  try {
    const userAddress = await db.userAddress.create({
      data: {
        cell: body.address.cell,
        sector: body.address.sector,
        district: body.address.district,
        province: body.address.province,
        village: body.address.village,
        latitude: body.address.latitude,
        longitude: body.address.longitude
      }
    });

    const password = await hashPassword(body.password);
    const userData = await db.user.create({
      data: {
        names: body.names,
        addressId: userAddress.id,
        telephone: body.telephone,
        password
      },
      select: { id: true, names: true, telephone: true }
    });
    const deviceUUID = generateAndReturnUUID();

    // Save device
    const device = await db.userDevice.create({
      data: { deviceUUID, userId: userData.id },
      select: { id: true, deviceUUID: true }
    });

    return res.status(201).json({
      statusCode: 201,
      success: true,
      message: 'Successfully Registered.',
      user: { ...userData, address: userAddress, device }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: `Something went wrong, try again`
    });
  }
};

// User controller to handle user login
export const LoginUser = async (req, res) => {
  const body = req.body;

  // Check if we have the user with same phone number
  const user = await db.user.findFirst({ where: { telephone: body.telephone } });
  if (!user) {
    return res.status(404).json({
      statusCode: 404,
      success: false,
      message: 'We can not find your account, try again'
    });
  }

  // Check if password is the same
  const passwordMatch = await comparePassword(body.password, user.password);
  if (passwordMatch) {
    // Generate token
    const token = generateToken({ id: user.id, isAdmin: user.isAdmin, names: user.names });
    // Destructure the required data
    const { id, isAdmin, names, telephone } = user;
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Login successfully',
      Data: user,
      Data: { id, isAdmin, names, telephone },
      token
    });
  } else {
    return res.status(406).json({
      statusCode: 406,
      success: false,
      message: 'Password is incorrect, try again!'
    });
  }
};

// Function to handle password change
export const ChangePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    // Find user by ID
    const user = await db.user.findFirst({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'User not found'
      });
    }

    // Check if the current password matches the one in the database
    const passwordMatch = await comparePassword(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(403).json({
        statusCode: 403,
        success: false,
        message: 'Current password is incorrect'
      });
    }
    // Hash the new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update the password in the database
    await db.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: 'Something went wrong, please try again later'
    });
  }
};