import { DataSourceOptions } from 'typeorm';
import { getEnvValue } from '../utils/env.utils';

function getDatabaseConfig(): DataSourceOptions {
  return {
    type: getEnvValue('DB_TYPE') as 'mysql',
    port: Number(getEnvValue('DB_PORT')),
    host: getEnvValue('DB_HOST'),
    username: getEnvValue('DB_USERNAME'),
    password: getEnvValue('DB_PASSWORD'),
    database: getEnvValue('DB_NAME'),
    synchronize: true,
    logging: false,
  };
}

export default getDatabaseConfig;
