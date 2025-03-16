import { DatabaseException } from '../exceptions';
import { findDataFromUser } from '../repository/user.repository';
import { SignupType } from '../types/auth.types';
import { HTTP_STATUS } from '../constants/http-status.constant';
import { phone } from 'phone';

async function signUpUserServices(payload: SignupType) {
  const { phoneNumber, username, password } = payload;

  const existsUsername = await findDataFromUser(`username`, username);

  if (typeof existsUsername !== null && existsUsername) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The Username ${username} Have been Already Exists,Please Try a new Username`,
    );
  }

  const parsePayload = phone(phoneNumber);
  console.log(parsePayload);
}

export { signUpUserServices };
