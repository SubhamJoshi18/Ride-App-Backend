import { Channel, Connection } from 'amqplib';
import { INITIAL_DELAY_MS, MAX_RETRIES } from '../constants/modules.constant';
import userLogger from '../libs/logger.libs';
import amqplib from 'amqplib';
import { getEnvValue } from '../utils/env.utils';
import { MergeAllConsumerAndUp } from './consumers/initQueueConsumer';
import { resolve } from 'path';

class MainQueueManager {
  public connection: amqplib.ChannelModel;
  public channel: Channel;
  public rabbitMqUrl: string = getEnvValue('AMQP_URL') as string;

  public async initalizeConnection(retries: number = 0) {
    return new Promise(async (resolve, reject) => {
      try {
        const connection = await amqplib.connect(this.rabbitMqUrl);
        const channel = await connection.createChannel();
        this.setConnection(connection);
        this.setChannel(channel);
        resolve(true);
      } catch (err) {
        if (retries < MAX_RETRIES) {
          const delay = INITIAL_DELAY_MS * 2 ** retries;
          userLogger.error(`
            Retrying  (${retries + 1}/${MAX_RETRIES}) in ${delay}ms...`);

          await new Promise((resolve) => setTimeout(resolve, delay));
          return this.initalizeConnection(retries + 1);
        }
      }
    });
  }

  public async startAllConsumer() {
    await MergeAllConsumerAndUp(this.channel);
  }

  public setConnection(conn: amqplib.ChannelModel) {
    this.connection = conn;
  }

  public setChannel(channel: Channel) {
    this.channel = channel;
  }

  public async getChannel() {
    if (this.channel) {
      return this.channel;
    }
    await this.initalizeConnection();
    return this.channel;
  }

  public async getConnection() {
    if (this.connection) {
      return this.connection;
    }
    await this.initalizeConnection();
    return this.connection;
  }
}

export default MainQueueManager;
