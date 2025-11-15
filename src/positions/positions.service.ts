import { Injectable, Inject } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class PositionsService {
  constructor(
    @Inject('PERSIST_POSITIONS_QUEUE') private readonly positionsQueue: Queue,
  ) {}

  async addPositionJob(data: any) {
    await this.positionsQueue.add('save-position', data);
  }
}
