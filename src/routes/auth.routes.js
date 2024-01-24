import { Router } from 'express';
import { CreateUser, LoginUser } from '../controller/auth';
import { ValidateData, ValidateLoginData } from '../middleware';

export const AuthRouter = Router();

AuthRouter.post('/signup', ValidateData, CreateUser);
AuthRouter.post('/signin', ValidateLoginData, LoginUser);
