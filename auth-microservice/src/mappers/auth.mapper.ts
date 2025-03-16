import { Users } from '../database/entities/user.entity';
import { UserProfile } from '../database/entities/userProfile.entity';
import { createAccessToken, createRefreshToken } from '../helpers/jwt.helpers';
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

async function createAccessTokenAuthPayload(
  userPayload: Users,
  userProfilePayload: UserProfile,
) {
  const payload = {
    userId: userPayload.id,
    username: userPayload.username,
    phoneNumber: userPayload.phoneNumber,
    isActive: userProfilePayload.isActive,
  };

  const accessToken = await createAccessToken(payload);
  return {
    accessToken,
  };
}

async function createRefreshTokenAuthPayload(
  userPayload: Users,
  userProfilePayload: UserProfile,
) {
  const payload = {
    userId: userPayload.id,
    username: userPayload.username,
    phoneNumber: userPayload.phoneNumber,
    isActive: userProfilePayload.isActive,
  };

  const refreshToken = await createRefreshToken(payload);
  return {
    refreshToken,
  };
}

export {
  prepareAuthPayload,
  prepareUserProfilePayload,
  createRefreshTokenAuthPayload,
  createAccessTokenAuthPayload,
};
