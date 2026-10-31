import { SortOrder, Types } from 'mongoose';
import { MeasurementModel } from '../models/measurements.js';
import { AppError } from '../utils/AppError.js';

export type AverageMeasurements = {
  systolic: number | null;
  diastolic: number | null;
  pulse: number | null;
  measurementCount: number;
};

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

export async function getMeasurementsService(
  userId: string,
  currentPage: number,
  perPage: number,
  start: Date | null,
  end: Date | null,
  sort: SortOrder,
) {
  // building a filter
  const filter: {
    user: string;
    date?: {
      $gte?: Date;
      $lte?: Date;
    };
  } = {
    user: userId,
  };
  if (start || end) {
    filter.date = {};
    if (start) filter.date.$gte = start;
    if (end) filter.date.$lte = end;
  }

  try {
    // total measurements for user in date range
    const totalMeasurements =
      await MeasurementModel.find(filter).countDocuments();
    console.log(`totalMeasurements=${totalMeasurements}`);

    // users filtered measurements
    const measurements = await MeasurementModel.find(filter)
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ date: sort });
    console.log(measurements);
    return { measurements, totalMeasurements };
  } catch (error) {
    console.log(error);
    throw new AppError('Failed to get measurements', 500);
  }
}

export async function getAverageMeasurementsService(
  userId: string,
  start: Date | null,
  end: Date | null,
): Promise<AverageMeasurements> {
  const match: {
    user: Types.ObjectId;
    date?: {
      $gte?: Date;
      $lte?: Date;
    };
  } = {
    user: new Types.ObjectId(userId),
  };

  if (start || end) {
    match.date = {};
    if (start) match.date.$gte = start;
    if (end) match.date.$lte = end;
  }

  try {
    const [averages] = await MeasurementModel.aggregate<AverageMeasurements>([
      { $match: match },
      {
        $group: {
          _id: null,
          systolic: { $avg: '$systolic' },
          diastolic: { $avg: '$diastolic' },
          pulse: { $avg: '$pulse' },
          measurementCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          systolic: 1,
          diastolic: 1,
          pulse: 1,
          measurementCount: 1,
        },
      },
    ]);

    return (
      averages ?? {
        systolic: null,
        diastolic: null,
        pulse: null,
        measurementCount: 0,
      }
    );
  } catch (error) {
    console.log(error);
    throw new AppError('Failed to get average measurements', 500);
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
