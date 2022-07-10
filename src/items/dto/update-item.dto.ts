import { z } from 'zod';

export const updateItemDto = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  imgs: z.array(z.string()).optional(),
  stock: z.number().optional(),
});

export type UpdateItemDto = z.infer<typeof updateItemDto>;
