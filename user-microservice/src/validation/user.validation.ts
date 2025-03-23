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

const updateUserProfileSchema = z.object({
  uniqueName: z
    .string()
    .min(3, 'Unique Name must be at least 3 characters long')
    .max(20, 'Unique Names must be at most 20 characters long')
    .optional(),

  bio: z
    .string()
    .min(3, ' Bio must be at least 3 characters long')
    .max(200, 'Unique Names must be at most 20 characters long')
    .optional(),
});

export { createRiderSchema, updateUserProfileSchema };
