import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const handleError = (res: Response, error: z.ZodError) => {
  return res.status(400).json({
    errors: error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    })),
  });
};

export const validateBody =
  <T extends z.ZodTypeAny>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) return handleError(res, result.error);
    req.body = result.data;
    next();
  };