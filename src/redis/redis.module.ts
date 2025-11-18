import { Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { RedisConfig } from './redis.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // For RedisConfig
  providers: [
    RedisConfig, // For RedisProvider
    RedisProvider,
  ],
  exports: [RedisProvider],
})
export class RedisModule {}
