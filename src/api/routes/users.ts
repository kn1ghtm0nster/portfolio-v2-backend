import { Router } from 'express';
import {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
} from '../handlers/user.handlers';

export const userRouter = Router();

userRouter.get('/', getAllUsersHandler);
userRouter.post('/', createUserHandler);
userRouter.get('/:id', getUserByIdHandler);
