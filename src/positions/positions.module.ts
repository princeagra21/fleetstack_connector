import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { RedisModule } from 'src/redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from 'src/db/entities/position.entity';

@Module({
  imports: [RedisModule, TypeOrmModule.forFeature([PositionEntity])],
  providers: [PositionsService],
  exports: [PositionsService],
})
export class PositionsModule {}
