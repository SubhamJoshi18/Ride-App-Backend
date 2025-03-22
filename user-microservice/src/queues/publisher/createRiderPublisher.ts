import amqplib, { Channel } from 'amqplib';
import { ICreateRider } from '../../interfaces/user.interface';

async function publishCreaterideQueue(channel: Channel, payload: ICreateRider) {
  try {
  } catch (err) {
    throw err;
  } finally {
    if (channel) {
      await channel.close();
    }
  }
}
