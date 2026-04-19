import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import measurementRouter from './routes/measurements.routes.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import { AppError } from './utils/AppError.js';

export function createApp() {
  const app = express();

  // Enable cors
  app.use(cors({ origin: true, credentials: true }));
  // Middleware to parse JSON bodies
  app.use(express.json());
  // Middleware to parse cookies
  app.use(cookieParser());

  // routes
  app.use('/api/v1/measurements', measurementRouter);
  app.use('/api/v1/auth', authRouter);

  // error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    res.status(statusCode).json({
      message: err.message || 'Internal Server Error',
    });
  });

  return app;
}
