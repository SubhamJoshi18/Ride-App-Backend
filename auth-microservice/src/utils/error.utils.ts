import authLogger from '../libs/logger.libs';
import { HTTP_STATUS } from '../constants/http-status.constant';
import { Request, Response } from 'express';

function handleUnexpectedError(): void {
  process.on('uncaughtException', function (err) {
    // Handle the error safely
    console.log(
      '****** Unhandled exception in etl-pim-consumer code ******',
      err,
    );
    authLogger.error(
      `****** Unhandled exception in etl-pim-consumer code ****** ${err.message}`,
    );
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.log('****** Unhandled rejection at ', promise, `reason: ${reason}`);
    authLogger.error(
      `****** Unhandled rejection at ${promise} reason: ${reason}`,
    );
    process.exit(1);
  });

  process.on('SIGTERM', (signal) => {
    const message = `****** etl-pim-consumer Process ${process.pid} received a SIGTERM signal - ${signal}`;
    console.log(message);
    authLogger.error(message);
    process.exit(0);
  });

  process.on('SIGINT', (signal) => {
    const message = `****** etl-pim-consumer Process ${process.pid} received a SIGINT signal - ${signal}`;
    console.log(message);
    authLogger.error(message);
    process.exit(0);
  });
}

function handleNotFoundError(req: Request, res: Response): void {
  res.status(HTTP_STATUS.NOT_FOUND.CODE).json({
    message: `The Route : ${req.originalUrl} Does not Exists on the Ride App`,
  });
}

export { handleUnexpectedError, handleNotFoundError };
