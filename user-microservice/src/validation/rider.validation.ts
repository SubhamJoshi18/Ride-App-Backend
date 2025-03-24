import { z } from 'zod';

const createRideSchema = z.object({
  currentLocation: z
    .string()
    .min(3, ' Current Location must be at least 3 characters long')
    .max(200, 'Current Location must be at most 20 characters long'),
  destinationLocation: z
    .string()
    .min(3, ' Destination Location must be at least 3 characters long')
    .max(200, 'Destination Location must be at most 20 characters long'),
  flare: z.number(),
});

export { createRideSchema };
