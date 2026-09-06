import { Router } from 'express';
import {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  deleteUserHandler,
} from '../handlers/user.handlers';

export const userRouter = Router();

userRouter.get('/', getAllUsersHandler);
userRouter.post('/', createUserHandler);
userRouter.get('/:id', getUserByIdHandler);
userRouter.delete('/:id', deleteUserHandler);
