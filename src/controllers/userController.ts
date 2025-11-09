import { IncomingMessage, ServerResponse } from 'http';
import { getBodyData, validateBody } from '../utils';
import * as User from '../models/user';

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await User.getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server Side Error' }));
  }
};

export const create = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await getBodyData(req);
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age || !hobbies) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'No Required Values' }));
    } else {
      const user = { username, age, hobbies };

      if (!validateBody(user)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid Body Values' }));
      } else {
        const newUser = await User.createUser(user);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      }
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server Side Error' }));
  }
};

export const getById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const condidate = await User.getUserById(id);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(condidate));
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  }
};

export const update = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const body = await getBodyData(req);
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age || !hobbies) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'No Required Values' }));
    } else {
      const condidate = { username, age, hobbies };

      if (!validateBody(condidate)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid Body Values' }));
      } else {
        const updatedUser = await User.updateUser(condidate, id);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedUser));
      }
    }
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  }
};

export const remove = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    await User.deleteUser(id);
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end();
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  }
};
