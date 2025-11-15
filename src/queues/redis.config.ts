import IORedis from 'ioredis';

export const createRedisConnection = (): IORedis => {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    throw new Error('Environment variable REDIS_URL is required');
  }

  return new IORedis(redisUrl);
};
