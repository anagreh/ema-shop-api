import { z } from 'zod';

export const createItemDto = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  imgs: z.string().url(),
  stock: z.string(),
});

export type CreateItemDto = z.infer<typeof createItemDto>;
