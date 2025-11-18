// src/tcp/protocol-decoder/gt06.decoder.ts
import { Injectable } from '@nestjs/common';
import { PositionsService } from 'src/positions/positions.service';
import { IProtocolDecoder } from './protocol-decoder.interface';

@Injectable()
export class GT06Decoder implements IProtocolDecoder {
  constructor(private readonly positionsService: PositionsService) {}

  decode(frame: Buffer) {
    console.log('Decoding GT06 frame of length:', frame.length);

    // Minimal parsing example (replace with real GT06 parser)
    const deviceId = frame.slice(2, 10).toString('hex'); // example
    const packet = {
      deviceId,
      lat: 23.5, // dummy
      lon: 90.2, // dummy
      timestamp: Date.now(),
    };

    // Add job using PositionsService
    void this.positionsService.addPositionJob(packet);
    return packet;
  }
}
