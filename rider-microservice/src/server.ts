import { Application } from 'express';
import authLogger from './libs/logger.libs';
import { serverMiddleware } from './middleware/server.middleware';
import serverRouter from './routers/server.routers';
import SingletonDatabaseConnection from './database/connect';
import { DataSource } from 'typeorm';
import { getEnvValue } from './utils/env.utils';
import swaggerDocs from './swaggers/swaggerConnect';

class StartRiderMicroservice {
  public serverPort: number;
  public expressApp: Application;

  constructor(serverPort: number, expressApp: Application) {
    this.serverPort = serverPort;
    this.expressApp = expressApp;
  }

  private async initalizeServerSetup(app: Application) {
    await Promise.all([serverMiddleware(app), serverRouter(app)]);
  }

  public async connectDatabase(): Promise<void> {
    SingletonDatabaseConnection.getDbConnection().then(
      (connection: DataSource) => {
        authLogger.info(
          `Database is Connected , DB Name : ${getEnvValue('DB_NAME')}`,
        );
      },
    );
  }

  public async listenServer() {
    try {
      this.initalizeServerSetup(this.expressApp).then(() => {
        this.connectDatabase().then(() => {
          this.expressApp.listen(this.serverPort, () => {
            authLogger.info(
              `The User Microservice is running on the http://localhost:${this.serverPort}/api`,
            );

            swaggerDocs(this.expressApp, this.serverPort);
          });
        });
      });
    } catch (err) {
      authLogger.error(
        `Error while starting the User Microservices at the port : ${this.serverPort}`,
      );
      throw err;
    }
  }
}

export default StartRiderMicroservice;
