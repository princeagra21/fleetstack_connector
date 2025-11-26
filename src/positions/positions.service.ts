import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { PositionEntity } from 'src/db/entities/position.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PositionsService {
  private positionsQueue: Queue;

  constructor(
    @InjectRepository(PositionEntity)
    private readonly positionsRepository: Repository<PositionEntity>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis) {
    this.positionsQueue = new Queue('positions', {
      connection: this.redisClient,
    });
  }

  async addPositionJob(data: any) {
    console.log('Adding position job to queue:', data);
    await this.positionsQueue.add('save-position', data);
  }

  async savePositionToDb(data: any) {
    console.log('Saving position to database:', data);
    const position = this.positionsRepository.create(data);
    await this.positionsRepository.save(position);
  }

  async getPositions(): Promise<PositionEntity[]> {
    return this.positionsRepository.find();
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
