import { Router } from 'express';
import { createUser, loginUser } from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validate.js';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema.js';

const router = Router();

// auth routes
router.post('/register', validateBody(createUserSchema), createUser);
router.post('/login', validateBody(loginUserSchema), loginUser);

export default router;