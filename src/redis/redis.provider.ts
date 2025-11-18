import { Provider } from '@nestjs/common';
import { RedisConfig } from './redis.config';

export const RedisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  useFactory: (redisConfig: RedisConfig) => redisConfig.create(),
  inject: [RedisConfig],
};
