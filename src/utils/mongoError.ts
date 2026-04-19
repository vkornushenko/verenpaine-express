import { AppError } from './AppError.js';

export function handleMongoError(error: any) {
  // duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue || {})[0];
    const value = error.keyValue?.[field];

    return new AppError(`${field} ${value} already exists`, 400);
  }

  return error;
}
