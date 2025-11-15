import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, JetStreamManager } from 'nats';

@Injectable()
export class NatsService implements OnModuleInit {
  async onModuleInit() {
    const nc = await connect({ servers: process.env.NATS_URL });
    const jsm: JetStreamManager = await nc.jetstreamManager();
    await jsm.streams.add({ name: 'telemetry', subjects: ['telemetry.*'] });
    console.log('Connected to NATS JetStream');
  }
}
