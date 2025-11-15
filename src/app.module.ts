import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueuesModule } from './queues/queues.module';
import { TcpModule } from './tcp/tcp.module';
import { PositionsModule } from './positions/positions.module';

@Module({
  imports: [
    // Makes .env and process.env available in every file without re-importing config.
    ConfigModule.forRoot({ isGlobal: true }),

    // Creates and configures a TypeORM database connection
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.PG_URL,
        autoLoadEntities: true,
        synchronize: true, // disable in production
      }),
    }),

    // Application modules
    QueuesModule, // Redis + BullMQ queues
    PositionsModule, // Position service
    TcpModule, // TCP server + decoders
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
