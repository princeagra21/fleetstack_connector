import { Module, DynamicModule, Provider } from '@nestjs/common';
import {
  DecoderBinding,
  DECODER_CONFIG,
  DecoderConfigProvider,
} from './decoder-config.provider';
import { createTcpServerProvider } from './tcp-server.provider';
import { PositionsService } from 'src/positions/positions.service';
import { PositionsModule } from 'src/positions/positions.module';

@Module({})
export class TcpModule {
  static forRoot(): DynamicModule {
    const tcpServerProviders: Provider[] = [
      {
        provide: 'TCP_SERVERS',
        useFactory: (bindings: DecoderBinding[], positionsService: PositionsService) => {
          console.log("Setting up decoders...");
          bindings.map((binding) => createTcpServerProvider(binding, positionsService));
        },
        inject: [DECODER_CONFIG, PositionsService],
      },
    ];

    return {
      imports: [PositionsModule],
      module: TcpModule,
      providers: [DecoderConfigProvider, ...tcpServerProviders],
      exports: tcpServerProviders,
    };
  }
  
}
