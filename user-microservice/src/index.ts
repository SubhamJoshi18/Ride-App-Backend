import authLogger from './libs/logger.libs';
import express, { Application } from 'express';
import { getEnvValue } from './utils/env.utils';
import { handleUnexpectedError } from './utils/error.utils';
import { MAX_RETRIES, INITIAL_DELAY_MS } from './constants/modules.constant';
import StartUserMicroservice from './server';

async function startMicroservice(retries = 0) {
  try {
    const port =
      typeof getEnvValue('PORT') === 'string'
        ? Number(getEnvValue('PORT'))
        : getEnvValue('PORT');

    const app: Application = express();
    const authMicroserviceInstance = new StartUserMicroservice(
      port as number,
      app as Application,
    );

    handleUnexpectedError();

    await authMicroserviceInstance.listenServer();

    authLogger.info(`User microservice started on port ${port}`);
  } catch (err) {
    authLogger.error(`User Microservice startup failed: ${err}`);

    if (retries < MAX_RETRIES) {
      const delay = INITIAL_DELAY_MS * 2 ** retries;
      authLogger.error(
        `Retrying (${retries + 1}/${MAX_RETRIES}) in ${delay}ms...`,
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
      return startMicroservice(retries + 1);
    }

    authLogger.error('Maximum retries reached. Exiting process.');
    process.exit(1);
  }
}

(async () => {
  startMicroservice();
})();
