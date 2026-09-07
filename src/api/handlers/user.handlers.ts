import { type Request, type Response } from 'express';
import {
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  updateUser,
  deleteUser,
} from '../queries/user.queries';

export const getAllUsersHandler = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(200).json(users);
};

export const createUserHandler = async (req: Request, res: Response) => {
  const { email, name, username } = req.body;
  const existingUsername = await getUserByUsername(username);
  const existingEmail = await getUserByEmail(email);
  if (existingUsername || existingEmail) {
    return res
      .status(400)
      .json({ message: 'username or email is already taken' });
  }
  const newUser = await createUser(email, name, username);
  res.status(201).json(newUser);
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserById(Number(id));
  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }
  res.status(200).json(user);
};

export const updateUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name, username } = req.body;
  const user = await getUserById(Number(id));
  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }
  if (!email || !name || !username) {
    return res.status(400).json({ message: 'missing required fields' });
  }
  const updatedUser = await updateUser(Number(id), email, name, username);
  res.status(200).json(updatedUser);
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserById(Number(id));
  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }
  await deleteUser(Number(id));
  res.status(200).json({ message: 'user deleted' });
};
