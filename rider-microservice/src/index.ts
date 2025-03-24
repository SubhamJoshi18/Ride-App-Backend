import express, { Application } from 'express';
import { getEnvValue } from './utils/env.utils';
import { handleUnexpectedError } from './utils/error.utils';
import { MAX_RETRIES, INITIAL_DELAY_MS } from './constants/modules.constant';
import StartRiderMicroservice from './server';
import riderLogger from './libs/logger.libs';

async function startMicroservice(retries = 0) {
  try {
    const port =
      typeof getEnvValue('PORT') === 'string'
        ? Number(getEnvValue('PORT'))
        : getEnvValue('PORT');

    const app: Application = express();
    const authMicroserviceInstance = new StartRiderMicroservice(
      port as number,
      app as Application,
    );

    handleUnexpectedError();

    await authMicroserviceInstance.listenServer();

    riderLogger.info(`Rider microservice started on port ${port}`);
  } catch (err) {
    riderLogger.error(`Rider Microservice startup failed: ${err}`);

    if (retries < MAX_RETRIES) {
      const delay = INITIAL_DELAY_MS * 2 ** retries;
      riderLogger.error(
        `Retrying (${retries + 1}/${MAX_RETRIES}) in ${delay}ms...`,
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
      return startMicroservice(retries + 1);
    }

    riderLogger.error('Maximum retries reached. Exiting process.');
    process.exit(1);
  }
}

(async () => {
  startMicroservice();
})();
