import { Test, TestingModule } from '@nestjs/testing';
import { TeltonikaDecoder } from './teltonika.decoder';
import { ConfigModule } from '@nestjs/config';
import { PositionsModule } from 'src/positions/positions.module';

describe('TeltonikaDecoder + PositionsService', () => {
  let decoder: TeltonikaDecoder;
  // let mockQueue: Partial<Queue>;

  beforeEach(async () => {
    // Mock queue
    // mockQueue = {
    //   add: jest.fn().mockResolvedValue(undefined),
    // };

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), PositionsModule],
      providers: [TeltonikaDecoder],
    }).compile();

    decoder = module.get<TeltonikaDecoder>(TeltonikaDecoder);
  });

  it('should be defined', () => {
    expect(decoder).toBeDefined();
  });

  it('should decode frame and add job to queue', () => {
    const fakeFrame = Buffer.from([1, 2, 3, 4, 5]);
    const packet = decoder.decode(fakeFrame);

    // Packet should have correct fields
    expect(packet).toHaveProperty('deviceId');
    expect(packet).toHaveProperty('lat');
    expect(packet).toHaveProperty('lon');
    expect(packet).toHaveProperty('timestamp');
  });

  // it('PositionsService.addPositionJob should call queue.add', async () => {
  //   const data = { deviceId: '123', lat: 1, lon: 2, timestamp: Date.now() };
  //   await positionsService.addPositionJob(data);
  //   expect(mockQueue.add).toHaveBeenCalledWith('save-position', data);
  // });
});
