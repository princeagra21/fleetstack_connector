import { Injectable, Inject } from '@nestjs/common';
import { Queue } from 'bullmq';
import Redis from 'ioredis';

@Injectable()
export class PositionsService {
  private positionsQueue: Queue;

  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {
    this.positionsQueue = new Queue('positions', {
      connection: this.redisClient,
    });
  }

  async addPositionJob(data: any) {
    await this.positionsQueue.add('save-position', data);
  }

  async quitRedisClient() {
    if (this.redisClient && this.redisClient.quit) {
      await this.redisClient.quit();
    }
  }

  async cleanup() {
    if (this.positionsQueue) {
      await this.positionsQueue.close();
    }

    await this.quitRedisClient();
  }

  async onModuleDestroy() {
    await this.cleanup();
  }
}
