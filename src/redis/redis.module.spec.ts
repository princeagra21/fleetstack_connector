import { Test, TestingModule } from '@nestjs/testing';
import { Redis } from 'ioredis';
import { RedisModule } from './redis.module';
import { ConfigModule } from '@nestjs/config';

describe('RedisModule', () => {
  let moduleRef: TestingModule;
  let redisClient: Redis;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), RedisModule],
    }).compile();

    redisClient = moduleRef.get('REDIS_CLIENT');
  });

  it('should be defined', () => {
    expect(moduleRef).toBeDefined();
  });

  it('should provide REDIS_CLIENT', () => {
    expect(redisClient).toBeDefined();
    expect(typeof redisClient.get).toBe('function');
    expect(typeof redisClient.set).toBe('function');
  });

  afterAll(async () => {
    if (redisClient.quit) {
      await redisClient.quit();
    }
  });
});
