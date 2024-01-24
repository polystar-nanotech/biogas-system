import { Router } from "express";
import { GetOneDevice, GetAllDevices } from "../controller/devices";

export const DeviceRouter = Router();

DeviceRouter.get('/', GetAllDevices);
DeviceRouter.get('/:id', GetOneDevice)