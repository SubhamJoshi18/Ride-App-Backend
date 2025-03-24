import jwt from 'jsonwebtoken';
import { ITokenPayload } from '../interfaces/token.interface';
import { getEnvValue } from '../utils/env.utils';

async function createAccessToken(payload: ITokenPayload) {
  const options: jwt.SignOptions = {
    issuer: 'Ride-App-Backend',
    expiresIn: '1d',
  };

  const secretKey = getEnvValue('SECRET_ACCESS_TOKEN') as string;

  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretKey, options, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token as string);
    });
  });
}

async function createRefreshToken(payload: ITokenPayload) {
  const options: jwt.SignOptions = {
    issuer: 'Ride-App-Backend',
    expiresIn: '7d',
  };

  const secretKey = getEnvValue('SECRET_REFRESH_TOKEN') as string;

  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretKey, options, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token as string);
    });
  });
}

async function verifyAccessToken(token: string) {
  const secretKey = getEnvValue('SECRET_ACCESS_TOKEN') as string;
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decodedToken) => {
      if (err) {
        reject(err);
      }
      resolve(decodedToken);
    });
  });
}

export { createAccessToken, createRefreshToken, verifyAccessToken };
