import { Router } from 'express';
import {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../handlers/user.handlers';

export const userRouter = Router();

userRouter.get('/', getAllUsersHandler);
userRouter.post('/', createUserHandler);
userRouter.get('/:id', getUserByIdHandler);
userRouter.put('/:id', updateUserHandler);
userRouter.delete('/:id', deleteUserHandler);
