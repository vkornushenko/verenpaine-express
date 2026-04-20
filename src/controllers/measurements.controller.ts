import { Request, Response } from 'express';
import { MeasurementModel } from '../models/measurements.js';
import {
  createMeasurementService,
  getMeasurementsService,
  getMeasurementByIdService,
} from '../services/measurements.service.js';
import { AppError } from '../utils/AppError.js';

export async function createMeasurement(req: Request, res: Response) {
  if (!req.user!.id) {
    throw new AppError('User not found', 404);
  }
  const measurement = await createMeasurementService({
    user: req.user!.id,
    ...req.body,
  });
  res.status(201).json({
    data: measurement.toObject(),
  });
}

export async function getMeasurements(req: Request, res: Response) {
  if (!req.user!.id) {
    throw new AppError('User not found', 404);
  }
  const measurements = await getMeasurementsService(req.user!.id);
  res.status(200).json({
    data: measurements.map((m) => m.toObject()),
  });
}

export async function getMeasurementById(req: Request, res: Response) {
  if (!req.user!.id) {
    throw new AppError('User not found', 404);
  }
  const userId = req.user!.id;
  const measurementId = req.params.id as string;

  const measurement = await getMeasurementByIdService({userId, measurementId});
  res.status(200).json({
    data: measurement.toObject(),
  });
}
