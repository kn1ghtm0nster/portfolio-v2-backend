import { type Request, type Response } from 'express';
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
} from '../queries/user.queries';

export const getAllUsersHandler = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(200).json(users);
};
