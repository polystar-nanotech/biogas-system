import { db } from './prisma.client';

export const findDevice = async (deviceUUID) => {
  const device = await db.userDevice.findUnique({
    where: { deviceUUID },
    include: { user: { include: { address: true } } }
  });

  if (!device) {
    throw new Error('Device not found');
  }
  delete device.user.password;
  return device;
};
