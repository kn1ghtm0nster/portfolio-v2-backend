import { type Request, type Response } from 'express';
import {
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  deleteUser,
} from '../queries/user.queries';

export const getAllUsersHandler = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(200).json(users);
};

export const createUserHandler = async (req: Request, res: Response) => {
  const { email, name, username } = req.body;
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: 'username is already taken' });
  }
  const newUser = await createUser(email, name, username);
  res.status(201).json(newUser);
};
