import { Module, Global } from '@nestjs/common';
import { PersistPositionsQueueProvider } from './queues.provider';

@Global()
@Module({
  providers: [PersistPositionsQueueProvider],
  exports: [PersistPositionsQueueProvider],
})
export class QueuesModule {}
