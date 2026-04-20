import { Router } from 'express';
import { createMeasurement, getMeasurements, getMeasurementById } from '../controllers/measurements.controller.js';
import { validateBody } from '../middlewares/validate.js';
import { createMeasurementSchema } from '../schemas/measurement.schema.js';
import { isAuth } from '../middlewares/is-auth.js';

const router = Router();

// measurement routes
router.post('/', isAuth, validateBody(createMeasurementSchema), createMeasurement);
router.get('/', isAuth, getMeasurements);
router.get('/:id', isAuth, getMeasurementById);

export default router;