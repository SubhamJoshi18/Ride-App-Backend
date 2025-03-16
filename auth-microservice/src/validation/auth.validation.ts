import { z } from 'zod';

const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username must be at most 20 characters long'),
    phoneNumber: z
      .string()
      .min(10, 'Phone number must be at least 10 digits long')
      .max(15, 'Phone number must be at most 15 digits long'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Password confirmation must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits long')
    .max(15, 'Phone number must be at most 15 digits long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export { signupSchema, loginSchema };
