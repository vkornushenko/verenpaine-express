import { Request, Response } from 'express';
import {
  createUserService,
  loginUserService,
} from '../services/auth.service.js';
import { generateToken } from '../utils/jwt.js';

// create user
export async function createUser(req: Request, res: Response) {
  // create user
  const user = await createUserService(req.body);
  // send user without password to client
  res.status(201).json({
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  });
}

// login user
export async function loginUser(req: Request, res: Response) {
  const user = await loginUserService(req.body.email, req.body.password);
  const token = generateToken(user);
  // development
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  });
  return res.status(200).json(user);
}
