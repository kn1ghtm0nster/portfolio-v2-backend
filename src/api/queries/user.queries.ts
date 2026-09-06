import { db } from '../../prisma/db';

export const getAllUsers = async () => {
  return await db.orm.public.User.select(
    'id',
    'email',
    'name',
    'username',
  ).all();
};

export const createUser = async (
  email: string,
  name: string,
  username: string,
) => {
  return await db.orm.public.User.create({
    email,
    name,
    username,
  });
};

export const getUserById = async (id: number) => {
  return await db.orm.public.User.where({
    id,
  }).first();
};

export const getUserByUsername = async (username: string) => {
  return await db.orm.public.User.where({
    username,
  }).first();
};

export const getUserByEmail = async (email: string) => {
  return await db.orm.public.User.where({
    email,
  }).first();
};

export const deleteUser = async (id: number) => {
  return await db.orm.public.User.where({
    id,
  }).delete();
};
