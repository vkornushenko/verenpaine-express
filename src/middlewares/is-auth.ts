import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';

export function isAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) {
    throw new AppError('Unauthorized', 401);
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return res.status(500).json({
      message: 'JWT secret is not defined',
    });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      id: string;
    };

    req.user = { id: decodedToken.id };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Token expired', 401);
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Invalid token', 401);
    }

    if (error instanceof jwt.NotBeforeError) {
      throw new AppError('Token not active yet', 401);
    }
    throw new AppError('Auth failed', 500);
  }
}
