import { Injectable } from '@nestjs/common';

@Injectable()
export class TeltonikaFrameDecoder {
  private buffer: Buffer = Buffer.alloc(0);

  addChunk(chunk: Buffer): Buffer[] {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    const frames: Buffer[] = [];

    while (this.buffer.length >= 12) {
      const frameLength = this.buffer.readUInt32BE(0);
      if (this.buffer.length >= frameLength + 4) {
        frames.push(this.buffer.slice(0, frameLength + 4));
        this.buffer = this.buffer.slice(frameLength + 4);
      } else break;
    }

    return frames;
  }
}
