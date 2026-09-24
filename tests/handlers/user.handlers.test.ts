import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Request, Response } from 'express';

import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
} from '../../src/api/handlers/user.handlers';
import * as userQueries from '../../src/api/queries/user.queries';

vi.mock('../../src/api/queries/user.queries', () => ({
  getAllUsers: vi.fn(),
  createUser: vi.fn(),
  getUserById: vi.fn(),
  getUserByUsername: vi.fn(),
  getUserByEmail: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
}));

const mockedQueries = vi.mocked(userQueries);

type MockResponse = Response & {
  status: ReturnType<typeof vi.fn>;
  json: ReturnType<typeof vi.fn>;
};

const createMockResponse = (): MockResponse => {
  const res = {} as MockResponse;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('user handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns all users', async () => {
    const users = [{ id: 1, email: 'john@example.com' }];
    mockedQueries.getAllUsers.mockResolvedValue(
      users as Awaited<ReturnType<typeof userQueries.getAllUsers>>,
    );

    const req = {} as Request;
    const res = createMockResponse();

    await getAllUsersHandler(req, res);

    expect(mockedQueries.getAllUsers).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(users);
  });

  it('prevents creating a user when username or email already exists', async () => {
    mockedQueries.getUserByUsername.mockResolvedValue(
      { id: 5 } as Awaited<ReturnType<typeof userQueries.getUserByUsername>>,
    );
    mockedQueries.getUserByEmail.mockResolvedValue(
      null as Awaited<ReturnType<typeof userQueries.getUserByEmail>>,
    );

    const req = {
      body: {
        email: 'john@example.com',
        name: 'John Doe',
        username: 'johndoe',
      },
    } as Request;
    const res = createMockResponse();

    await createUserHandler(req, res);

    expect(mockedQueries.createUser).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'username or email is already taken',
    });
  });

  it('returns 404 when user by id is not found', async () => {
    mockedQueries.getUserById.mockResolvedValue(
      null as Awaited<ReturnType<typeof userQueries.getUserById>>,
    );

    const req = { params: { id: '123' } } as unknown as Request;
    const res = createMockResponse();

    await getUserByIdHandler(req, res);

    expect(mockedQueries.getUserById).toHaveBeenCalledWith(123);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'user not found' });
  });

  it('returns 400 when update payload has missing required fields', async () => {
    mockedQueries.getUserById.mockResolvedValue(
      { id: 1 } as Awaited<ReturnType<typeof userQueries.getUserById>>,
    );

    const req = {
      params: { id: '1' },
      body: { email: 'john@example.com', username: 'johndoe' },
    } as unknown as Request;
    const res = createMockResponse();

    await updateUserHandler(req, res);

    expect(mockedQueries.updateUser).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'missing required fields',
    });
  });

  it('deletes user when present', async () => {
    mockedQueries.getUserById.mockResolvedValue(
      { id: 7 } as Awaited<ReturnType<typeof userQueries.getUserById>>,
    );
    mockedQueries.deleteUser.mockResolvedValue(
      null as Awaited<ReturnType<typeof userQueries.deleteUser>>,
    );

    const req = { params: { id: '7' } } as unknown as Request;
    const res = createMockResponse();

    await deleteUserHandler(req, res);

    expect(mockedQueries.deleteUser).toHaveBeenCalledWith(7);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'user deleted' });
  });
});
