import { Router } from 'express';
import { ChangePassword, CreateUser, LoginUser } from '../controller/auth';
import { ValidateData, ValidateLoginData } from '../middleware';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export const AuthRouter = Router();

AuthRouter.post('/signup', ValidateData, CreateUser);
AuthRouter.post('/signin', ValidateLoginData, LoginUser);
AuthRouter.post('/change-password', ChangePassword);
