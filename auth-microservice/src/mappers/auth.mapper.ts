import { IUserPayload } from '../interfaces/auth.interface';
import { SignupType } from '../types/auth.types';

function prepareAuthPayload(
  payload: SignupType,
  countryIsoCode: string,
  hashPassword: string,
): object {
  if ('password' in payload) {
    delete (payload as any)['password'];
    delete (payload as any)['confirmPassword'];
  }

  const payloadToInsert = Object.assign(payload, {
    password: hashPassword,
    countryISO: countryIsoCode,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return Object.entries(payloadToInsert).length > 0 ? payloadToInsert : {};
}

function prepareUserProfilePayload(userFirstName: string) {
  return Object.assign(
    {
      uniqueName: userFirstName,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  );
}

export { prepareAuthPayload, prepareUserProfilePayload };
