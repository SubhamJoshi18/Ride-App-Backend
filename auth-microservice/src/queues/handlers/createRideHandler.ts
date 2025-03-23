import { Channel, ConsumeMessage } from 'amqplib';
import { RabbitMQExceptions } from '../../exceptions';
import { HTTP_STATUS } from '../../constants/http-status.constant';

async function handleCreateRideMessage(channel: Channel, msg: ConsumeMessage) {
  try {
    const content = msg?.content ?? null;
    if (content) {
      throw new RabbitMQExceptions(
        HTTP_STATUS.BAD_REQUEST.CODE,
        `createRideConsumer: The Content Property on the Message Field is Empty`,
      );
    }
    const parseContent = JSON.parse(content.toString());
    console.log(`This is the Parse Content`, parseContent);
  } catch (err) {
    throw err;
  }
}

export { handleCreateRideMessage };
