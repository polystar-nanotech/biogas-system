import { Router } from "express";
import { CreateUser } from "../controller/auth";
import { ValidateData } from "../middleware/signup-validator";

export const AuthRouter = Router();

AuthRouter.post('/signup', ValidateData, CreateUser);