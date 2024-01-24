import { db, findDevice } from '../../utils';

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
    const device = await findDevice(deviceUUID);
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Device fetched successfully',
      data: device
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: `Error while getting device: ${error.message}`
    });
  }
};

export const getDeviceData = async (req, res) => {
  const deviceUUID = req.params.id;
  const user = req.user;

  try {
    await findDevice(deviceUUID);
    if (user.isAdmin) {
      const data = await db.biogasData.findMany({
        where: { deviceUUID },
        include: { device: { select: { deviceUUID: true, user: userData } } },
        orderBy: { createdAt: 'desc' }
      });

      return res
        .status(200)
        .json({ statusCode: 200, success: true, message: `Data for ${deviceUUID}`, data });
    }

    const dataForOwner = await db.biogasData.findMany({
      where: { deviceUUID, device: { userId: user.id } },
      include: { device: { select: { deviceUUID: true, user: userData } } },
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: `Data for ${deviceUUID}`,
      data: dataForOwner
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: `Error while getting device: ${error.message}`
    });
  }
};
