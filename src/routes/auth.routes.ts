import { Router } from 'express';
import { createUser, getUserById, loginUser } from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validate.js';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema.js';
import { isAuth } from '../middlewares/is-auth.js';

const router = Router();

// auth routes
router.post('/register', validateBody(createUserSchema), createUser);
router.post('/login', validateBody(loginUserSchema), loginUser);
router.get('/user', isAuth, getUserById);

export default router;