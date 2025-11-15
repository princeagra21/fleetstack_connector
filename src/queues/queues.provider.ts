import { Queue } from 'bullmq';
import { createRedisConnection } from './redis.config';

const connection = createRedisConnection();

export const PersistPositionsQueueProvider = {
  provide: 'PERSIST_POSITIONS_QUEUE',
  useValue: new Queue('persist.positions', { connection }),
};
