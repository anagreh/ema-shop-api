import { z } from 'zod';

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
}, z.date());

export const createUserDto = z.object({
  name: z.string(),
  email: z.string().email({ message: 'not valid email' }),
  password: z.string().min(8),
  address: z.string(),
  phone: z.string(),
  date_of_birth: dateSchema,
});

export type CreateUserDto = z.infer<typeof createUserDto>;
