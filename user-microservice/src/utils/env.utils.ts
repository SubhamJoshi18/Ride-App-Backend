import dotenv from 'dotenv';
dotenv.config();

const checkEnvValueExists = (key: string): boolean => {
  return process.env.hasOwnProperty(key) && process.env[key] ? true : false;
};

const retrieveEnvValue = (key: string) => {
  return process.env[key];
};

const getEnvValue = (key: string): string | undefined => {
  return checkEnvValueExists(key) ? retrieveEnvValue(key) : undefined;
};

export { getEnvValue };
