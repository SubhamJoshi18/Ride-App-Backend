import getDatabaseConfig from '../config/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { MAX_RETRIES, INITIAL_DELAY_MS } from '../constants/modules.constant';
import authLogger from '../libs/logger.libs';

class SingletonDatabaseConnection {
  public static isConnected: boolean = false;

  public static async getDbConnection(retry = 0): Promise<any> {
    try {
      const databaseSource = new DataSource(
        getDatabaseConfig() as DataSourceOptions,
      );
      return databaseSource;
    } catch (err) {
      authLogger.error(
        `Error while connecting to the Database, Retrying it`,
        err,
      );

      if (retry < MAX_RETRIES) {
        const delay = INITIAL_DELAY_MS * 2 ** retry;
        authLogger.error(
          `Retrying (${retry + 1}/${MAX_RETRIES}) in ${delay}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.getDbConnection(retry + 1);
      }

      authLogger.error(
        'Maximum Database Connection Retries reached. Exiting process.',
        err,
      );
      process.exit(1);
    }
  }
}

export default SingletonDatabaseConnection;
