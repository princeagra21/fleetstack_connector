import { Module } from '@nestjs/common';
import { TeltonikaDecoder } from './protocol-decoder/teltonika.decoder';
import { PositionsService } from 'src/positions/positions.service';

@Module({
  providers: [TeltonikaDecoder, PositionsService],
  exports: [TeltonikaDecoder],
})
export class TcpModule {}
