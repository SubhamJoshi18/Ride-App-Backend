import { Application } from 'express';
import { serverMiddleware } from './middleware/server.middleware';
import serverRouter from './routers/server.routers';
import SingletonDatabaseConnection from './database/connect';
import { DataSource } from 'typeorm';
import { getEnvValue } from './utils/env.utils';
import swaggerDocs from './swaggers/swaggerConnect';
import MainQueueManager from './queues/mainQueueManager';
import riderLogger from './libs/logger.libs';

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
        riderLogger.info(
          `Database is Connected , DB Name : ${getEnvValue('DB_NAME')}`,
        );
      },
    );
  }

  public async startRabbitMQServer(): Promise<void> {
    const rabbitMQInstances = new MainQueueManager();
    rabbitMQInstances.initalizeConnection().then((result: boolean) => {
      if (result) {
        rabbitMQInstances.startAllConsumer();
      }
    });
  }

  public async listenServer() {
    try {
      this.initalizeServerSetup(this.expressApp).then(() => {
        this.connectDatabase().then(() => {
          this.startRabbitMQServer().then(() => {
            this.expressApp.listen(this.serverPort, () => {
              riderLogger.info(
                `The Rider Microservice is running on the http://localhost:${this.serverPort}/api`,
              );
              swaggerDocs(this.expressApp, this.serverPort);
            });
          });
        });
      });
    } catch (err) {
      riderLogger.error(
        `Error while starting the Auth Microservices at the port : ${this.serverPort}`,
      );
      throw err;
    }
  }
}

export default StartRiderMicroservice;
