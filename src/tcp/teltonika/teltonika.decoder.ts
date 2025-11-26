import { Injectable } from '@nestjs/common';
import { PositionsService } from 'src/positions/positions.service';

@Injectable()
export class TeltonikaDecoder {
  constructor(private readonly positionsService: PositionsService) {}

  decode(frame: Buffer) {
    console.log('Decoding Teltonika frame of length:', frame.length);

    // Parse frame
    const packet = {
      deviceId: '111111111111112',
      lat: 27.23171,
      lon: 78.247557,
      timestamp: Date.now(),
    };

    return packet;
  }
}
