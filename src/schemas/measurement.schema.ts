import { z } from 'zod';

export const createMeasurementSchema = z.object({
  date: z.coerce.date().default(() => new Date()),
  systolic: z.coerce.number().int().positive(),
  diastolic: z.coerce.number().int().positive(),
  pulse: z.coerce.number().int().positive(),
});