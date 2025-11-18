import { Test, TestingModule } from '@nestjs/testing';
import { PositionsModule } from './positions.module';
import { PositionsService } from './positions.service';
import { ConfigModule } from '@nestjs/config';

// Mock BullMQ Queue
// class MockQueue {
//   add = jest.fn();
// }

// Mock Redis client
// const mockRedisClient = {};

describe('PositionsModule', () => {
  let moduleRef: TestingModule;
  let service: PositionsService;
  // let mockQueueInstance: MockQueue;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), PositionsModule],
    })
      // override the Redis client provided by RedisModule
      // .overrideProvider('REDIS_CLIENT')
      // .useValue(mockRedisClient)
      // mock BullMQ Queue constructor (PositionsService creates Queue inside constructor)
      .compile();

    // Get the service
    service = moduleRef.get(PositionsService);

    // Replace its internal queue with a mocked queue instance
    // mockQueueInstance = new MockQueue();
    // (service as any).positionsQueue = mockQueueInstance;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a position job', async () => {
    const data = { lat: 123, lon: 456 };
    await service.addPositionJob(data);
    await service.cleanup();
  });
});
