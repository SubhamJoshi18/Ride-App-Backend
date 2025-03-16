import { SignupType } from '../types/auth.types';

async function signUpUserServices(payload: SignupType) {
  const { phoneNumber, username, password } = payload;
}

export { signUpUserServices };
