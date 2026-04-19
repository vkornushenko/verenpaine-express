import { Request, Response } from 'express';
import { MeasurementModel } from '../models/measurements.js';
import { createMeasurementService } from '../services/measurements.service.js';

export async function createMeasurement(req: Request, res: Response) {
  const measurement = await createMeasurementService({
    user: req.user?.id,
    ...req.body,
  });
  res.status(201).json({
    data: measurement.toObject(),
  });
}

export async function getMeasurements(req: Request, res: Response) {
  try {
    const measurements = await MeasurementModel.find({ user: req.user?.id });
    res.json({
      data: measurements.map((m) => m.toObject()),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Failed to get measurements' });
  }
}

export async function getMeasurementById(req: Request, res: Response) {
  try {
    const measurement = await MeasurementModel.findById(req.params.id);
    if (!measurement)
      return res.status(404).json({ message: 'Measurement not found' });
    res.json({
      data: measurement.toObject(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Failed to get measurement' });
  }
}
