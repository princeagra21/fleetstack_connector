import { Injectable } from '@nestjs/common';
import { IFrameDecoder } from '../frame-decoder.interface';

@Injectable()
export class TeltonikaFrameDecoder implements IFrameDecoder {
  private buffer = Buffer.alloc(0);

  extractFrames(data: Buffer): Buffer[] {
    this.buffer = Buffer.concat([this.buffer, data]);
    const frames: Buffer[] = [];

    // Example Teltonika frame: starts with 0x00 0x0F, ends with length-defined frame
    while (this.buffer.length >= 4) {
      const length = this.buffer.readUInt16BE(2); // assuming length is at byte 2-3
      if (this.buffer.length < length + 4) break;

      const frame = this.buffer.slice(0, length + 4);
      frames.push(frame);

      this.buffer = this.buffer.slice(length + 4);
    }

    return frames;
  }

  getRemainingBuffer(): Buffer {
    return this.buffer;
  }
}
