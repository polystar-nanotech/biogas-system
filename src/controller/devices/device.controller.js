import { db } from '../../utils';

const userData = {
  select: {
    names: true,
    telephone: true
  }
};
export const GetAllDevices = async (req, res) => {
  const user = req.user;

  if (user.isAdmin) {
    try {
      const devices = await db.userDevice.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: userData
        }
      });
      return res.status(200).json({
        statusCode: 200,
        success: true,
        data: devices
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        success: false,
        message: 'Error whle getting devices, try again!'
      });
    }
  } else {
    try {
      const devices = await db.userDevice.findMany({
        where: { userId: user.id },
        include: { user: userData }
      });
      return res.status(200).json({
        statusCode: 200,
        success: true,
        data: devices
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        success: false,
        message: 'Error whle getting devices, try again!'
      });
    }
  }
};

export const GetOneDevice = async (req, res) => {
  const deviceUUID = req.params.id;

  try {
    const device = await db.userDevice.findUnique({
      where: { deviceUUID },
      include: { user: { include: { address: true } } }
    });
    if (!device) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'Device not found, provide correct UUID!'
      });
    }
    delete device.user.password;
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Device fetched successfully',
      data: device
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: 'Error whle getting device, try again!'
    });
  }
};
