import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(6)
});

export const loginUserSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});