import { Router } from 'express';
import { GetOneDevice, GetAllDevices, getDeviceData } from '../controller/devices';

export const DeviceRouter = Router();

DeviceRouter.get('/', GetAllDevices);
DeviceRouter.get('/:id', GetOneDevice);
DeviceRouter.get('/:id/data', getDeviceData);
