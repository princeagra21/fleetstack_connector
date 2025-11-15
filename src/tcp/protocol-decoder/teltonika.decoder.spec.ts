import { Test, TestingModule } from '@nestjs/testing';
import { TeltonikaDecoder } from './teltonika.decoder';
import { PositionsService } from 'src/positions/positions.service';
import { Queue } from 'bullmq';

describe('TeltonikaDecoder + PositionsService', () => {
  let decoder: TeltonikaDecoder;
  let positionsService: PositionsService;
  let mockQueue: Partial<Queue>;

  beforeEach(async () => {
    // Mock queue
    mockQueue = {
      add: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeltonikaDecoder,
        PositionsService,
        {
          provide: 'PERSIST_POSITIONS_QUEUE',
          useValue: mockQueue,
        },
      ],
    }).compile();

    decoder = module.get<TeltonikaDecoder>(TeltonikaDecoder);
    positionsService = module.get<PositionsService>(PositionsService);
  });

  it('should be defined', () => {
    expect(decoder).toBeDefined();
    expect(positionsService).toBeDefined();
  });

  it('should decode frame and add job to queue', () => {
    const fakeFrame = Buffer.from([1, 2, 3, 4, 5]);
    const packet = decoder.decode(fakeFrame);

    // Packet should have correct fields
    expect(packet).toHaveProperty('deviceId');
    expect(packet).toHaveProperty('lat');
    expect(packet).toHaveProperty('lon');
    expect(packet).toHaveProperty('timestamp');

    // Queue add should be called
    expect(mockQueue.add).toHaveBeenCalledWith('save-position', packet);
  });

  it('PositionsService.addPositionJob should call queue.add', async () => {
    const data = { deviceId: '123', lat: 1, lon: 2, timestamp: Date.now() };
    await positionsService.addPositionJob(data);
    expect(mockQueue.add).toHaveBeenCalledWith('save-position', data);
  });
});
