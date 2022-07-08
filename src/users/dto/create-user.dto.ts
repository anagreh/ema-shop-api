import { z } from 'zod';

export const createUserDto = z.object({
  name: z.string(),
  email: z.string().email({ message: 'not valid email' }),
  password: z.string().min(8),
  address: z.string(),
  phone: z.string(),
});

export type CreateUserDto = z.infer<typeof createUserDto>;
