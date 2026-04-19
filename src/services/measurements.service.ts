import { MeasurementModel } from '../models/measurements.js';
import { AppError } from '../utils/AppError.js';

export async function createMeasurementService(data: {
  user: string;
  systolic: number;
  diastolic: number;
  pulse: number;
}) {
  try {
    const measurement = await MeasurementModel.create(data);
    return measurement;
  } catch (error) {
    console.log(error);
    throw new AppError('Failed to create measurement', 500);
  }
}
