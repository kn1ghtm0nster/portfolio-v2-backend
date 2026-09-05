import { Router } from 'express';
import { getAllUsersHandler } from '../handlers/user.handlers';

export const userRouter = Router();

userRouter.get('/', getAllUsersHandler);
