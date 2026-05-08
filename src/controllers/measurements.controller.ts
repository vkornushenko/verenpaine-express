import { Request, Response } from 'express';
// import { MeasurementModel } from '../models/measurements.js';
import {
  createMeasurementService,
  getMeasurementsService,
  getMeasurementByIdService,
  deleteMeasurementByIdService,
} from '../services/measurements.service.js';
import { AppError } from '../utils/AppError.js';

export async function createMeasurement(req: Request, res: Response) {
  console.log('user is creating a new measurement:');
  console.log(req.body);

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
  console.log('getting Measurements')
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

  const measurement = await getMeasurementByIdService({
    userId,
    measurementId,
  });
  console.log('getting Measurement by ID')
  res.status(200).json({
    data: measurement.toObject(),
  });
}

export async function deleteMeasurementById(req: Request, res: Response) {
  if (!req.user!.id) {
    throw new AppError('User not found', 404);
  }
  
  const measurementId = req.params.id as string;

  const measurement = await deleteMeasurementByIdService({ measurementId });
  res.status(200).json({
    data: measurement.toObject(),
  });
}
