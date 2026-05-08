import { Request, Response } from 'express';
import {
  createUserService,
  getUserByIdService,
  loginUserService,
} from '../services/auth.service.js';
import { generateToken } from '../utils/jwt.js';
import { AppError } from '../utils/AppError.js';

// create user
export async function createUser(req: Request, res: Response) {
  // create user
  const user = await createUserService(req.body);
  // generate token
  const token = generateToken(user);

  // send user without password to client
  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  });
}

// login user
export async function loginUser(req: Request, res: Response) {
  const user = await loginUserService(req.body.email, req.body.password);
  const token = generateToken(user);

  // test
  const now = new Date().toLocaleString('fi-FI', {
    timeZone: 'Europe/Helsinki',
  });
  console.log(`user ${user.name} logged in at ${now}`);

  // // development
  // res.cookie('token', token, {
  //   httpOnly: true,
  //   sameSite: 'lax',
  //   // secure: false,
  //   path: '/',
  // });

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: token,
  });
}

// return user
export async function getUserById(req: Request, res: Response) {
  if (!req.user!.id) {
    throw new AppError('User not found', 404);
  }
  console.log('getting user from MongoDB')
  const userId = req.user!.id;
  const user = await getUserByIdService(userId);
  res.status(200).json({
    data: user.toObject(),
  });
}
