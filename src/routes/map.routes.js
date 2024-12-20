import { Router } from 'express'; 
import { getCoordinates } from '../controller/mapping';
export const mapRouter = Router();
 
mapRouter.get('/map', getCoordinates);
