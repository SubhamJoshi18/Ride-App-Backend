import { confidentallyConfig } from '../constants/queue.constant';
import { IConfidentallyUpdate } from '../interfaces/rider.interface';

function retrieveConfigPayload(payload: IConfidentallyUpdate) {
  const payloadExtracted = [];

  for (const [key, value] of Object.entries(payload)) {
    if (key in confidentallyConfig && confidentallyConfig[key]) {
      payloadExtracted.push(key);
    }
  }
  return payloadExtracted.length === 1 ? payloadExtracted.pop() : null;
}


export {
    retrieveConfigPayload
}