import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function isAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

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
      return res.status(401).json({ message: 'Token expired' });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (error instanceof jwt.NotBeforeError) {
      return res.status(401).json({ message: 'Token not active yet' });
    }

    return res.status(500).json({ message: 'Auth failed' });
  }
}
