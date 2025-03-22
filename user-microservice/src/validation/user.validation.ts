import { z } from 'zod';

const createRiderSchema = z.object({
  riderName: z
    .string()
    .min(3, 'Rider Name must be at least 3 characters long')
    .max(20, 'Rider Names must be at most 20 characters long'),

  riderPlateNumber: z
    .string()
    .length(4, 'Rider Plate Number must be exactly 4 digits long'),

  vechileType: z
    .string()
    .min(3, 'Vechile Type must be at least 3 characters long')
    .max(20, 'Vechile Type must be at most 20 characters long'),
});

export { createRiderSchema };
