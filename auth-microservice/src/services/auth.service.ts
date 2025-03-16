import { DatabaseException, ValidationException } from '../exceptions';
import { createUser, findDataFromUser } from '../repository/user.repository';
import { SignupType } from '../types/auth.types';
import { HTTP_STATUS } from '../constants/http-status.constant';
import { phone } from 'phone';
import authLogger from '../libs/logger.libs';
import { hashPassword } from '../helpers/bcrypt.helper';
import {
  prepareAuthPayload,
  prepareUserProfilePayload,
} from '../mappers/auth.mapper';
import { IUserPayload } from '../interfaces/auth.interface';
import { createUserProfileBasedOnUserId } from '../repository/userProfile.repository';

async function signUpUserServices(payload: SignupType) {
  const { phoneNumber, username, password } = payload;

  const existsUsername = await findDataFromUser(`username`, username);

  if (typeof existsUsername !== null && existsUsername) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The Username ${username} Have been Already Exists,Please Try a new Username`,
    );
  }

  const { isValid, countryCode, countryIso2 } = phone(phoneNumber);

  if (typeof isValid === 'boolean' && !isValid)
    throw new ValidationException(
      HTTP_STATUS.VALIDATION_ERROR.CODE,
      `The Phone Number is Un Recogonizeable,Please Enter the Correct Country Number`,
    );

  authLogger.info(
    `A User with Country Code : ${countryCode} is Creating an Account :${phoneNumber}`,
  );

  const isMatchPhoneNumber = await findDataFromUser('phoneNumber', phoneNumber);

  if (typeof isMatchPhoneNumber !== null && isMatchPhoneNumber) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The Phone Number : ${phoneNumber} Has Already Exists on the System, Please Log In`,
    );
  }

  const hashPass = await hashPassword(password);

  const payloadForCreation = prepareAuthPayload(payload, countryIso2, hashPass);

  const insertResult = await createUser(payloadForCreation as IUserPayload);

  const insertedUserId = insertResult.id;
  const insertedUserFirstName = insertResult.username;
  const userFirstName = insertedUserFirstName.split(' ')[0];
  const userProfilePayload = prepareUserProfilePayload(userFirstName);

  const savedProfileResult = await createUserProfileBasedOnUserId(
    insertedUserId,
    userProfilePayload,
  );

  return {
    content: `The User have been Registered Successfully`,
    userStatus: savedProfileResult['isActive'],
  };
}

export { signUpUserServices };
