import {
  comparePassword,
  db,
  generateToken,
  generateAndReturnUUID,
  hashPassword
} from '../../utils';

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
      select: { names: true, telephone: true }
    });
    const deviceUUID = generateAndReturnUUID();

    // Save device
    const device = await db.userDevice.create({
      data: { deviceUUID },
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
      success: true,
      message: `Something went wrong, try again`
    });
  }
};

export const LoginUser = async (req, res) => {
  const body = req.body;

  // Check if we have the user with same phone number
  const user = await db.user.findFirst({ where: { telephone: body.telephone } });
  if (!user) {
    return res
      .status(400)
      .json({
        statusCode: 400,
        success: false,
        message: 'We can not find your account, try again'
      });
  }

  // Check if password is the same
  const passwordMatch = await comparePassword(body.password, user.password);
  if (passwordMatch) {
    // Generate token
    const token = generateToken({ id: user.id, isAdmin: user.isAdmin, names: user.names });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Login successfully',
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
