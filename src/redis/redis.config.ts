import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IORedis from 'ioredis';

@Injectable()
export class RedisConfig {
  constructor(private config: ConfigService) {}

  create() {
    const url = this.config.get<string>('REDIS_URL');
    if (!url) {
      console.warn('⚠️ No REDIS_URL — Redis disabled');
      return null;
    }

    return new IORedis(url);
  }
}
