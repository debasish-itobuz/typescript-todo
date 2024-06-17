import { z } from 'zod';

export const userValidation = z.object({
    email: z.string({ message: "email is required" }),
    password: z.string({ message: "password is required" })
}).required()

export type User = z.infer<typeof userValidation>;