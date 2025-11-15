import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error('Environment variable REDIS_URL is required');
}

const connection = new IORedis(redisUrl);

export const persistPositionsQueue = new Queue('persist.positions', {
  connection,
});
export const persistEventsQueue = new Queue('persist.events', {
  connection,
});
