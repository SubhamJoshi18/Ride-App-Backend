import { z } from 'zod';
import { signupSchema, loginSchema } from '../validation/auth.validation';

type SignupType = z.infer<typeof signupSchema>;
type LoginType = z.infer<typeof loginSchema>;

export { SignupType, LoginType };
