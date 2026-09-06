import { Router } from 'express';
import {
  getAllUsersHandler,
  createUserHandler,
} from '../handlers/user.handlers';

export const userRouter = Router();

userRouter.get('/', getAllUsersHandler);
userRouter.post('/', createUserHandler);
