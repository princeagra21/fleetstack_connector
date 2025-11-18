import { Injectable } from '@nestjs/common';
import { IFrameDecoder } from '../frame-decoder.interface';

@Injectable()
export class GT06FrameDecoder implements IFrameDecoder {
  private buffer = Buffer.alloc(0);

  /**
   * Append incoming data and extract complete frames
   * For GT06, assume each frame starts with 0x78 0x78 and ends with 0x0D 0x0A
   */
  extractFrames(data: Buffer): Buffer[] {
    this.buffer = Buffer.concat([this.buffer, data]);
    const frames: Buffer[] = [];

    while (true) {
      const startIdx = this.buffer.indexOf(Buffer.from([0x78, 0x78]));
      if (startIdx === -1) break;

      const endIdx = this.buffer.indexOf(
        Buffer.from([0x0d, 0x0a]),
        startIdx + 2,
      );
      if (endIdx === -1) break;

      const frame = this.buffer.slice(startIdx, endIdx + 2);
      frames.push(frame);

      this.buffer = this.buffer.slice(endIdx + 2);
    }

    return frames;
  }

  getRemainingBuffer(): Buffer {
    return this.buffer;
  }
}
