import { Types } from 'mongoose';
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

export async function getMeasurementsService(userId: string) {
  try {
    const measurements = await MeasurementModel.find({ user: userId });
    return measurements;
  } catch (error) {
    console.log(error);
    throw new AppError('Failed to get measurements', 500);
  }
}

export async function getMeasurementByIdService({
  userId,
  measurementId,
}: {
  userId: string;
  measurementId: string;
}) {
  try {
    const measurement = await MeasurementModel.findOne({
      user: userId,
      _id: new Types.ObjectId(measurementId),
    });
    if (!measurement) {
      throw new AppError('Measurement not found', 404);
    }
    return measurement;
  } catch (error) {
    console.log(error);
    throw new AppError('Failed to get measurement', 500);
  }
}

// delete
export async function deleteMeasurementByIdService({
  measurementId,
}: {
  measurementId: string;
}) {
  try {
    const measurement = await MeasurementModel.findByIdAndDelete({
      _id: measurementId,
    });
    if (!measurement) {
      throw new AppError('Measurement not found', 404);
    }
    return measurement;
  } catch (error) {
    console.log(error);
    throw new AppError('Failed to delete measurement', 500);
  }
}
