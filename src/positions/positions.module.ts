import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [PositionsService],
  exports: [PositionsService],
})
export class PositionsModule {}
