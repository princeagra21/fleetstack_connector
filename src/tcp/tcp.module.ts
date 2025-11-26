import { Module, DynamicModule, Provider } from '@nestjs/common';
import {
  DecoderBinding,
  DECODER_CONFIG,
  DecoderConfigProvider,
} from './decoder-config.provider';
import { createTcpServerProvider } from './tcp-server.provider';

@Module({})
export class TcpModule {
  static forRoot(): DynamicModule {
    const tcpServerProviders: Provider[] = [
      {
        provide: 'TCP_SERVERS',
        useFactory: (bindings: DecoderBinding[]) => {
          console.log("Setting up decoders...");
          bindings.map((binding) => createTcpServerProvider(binding));
        },
        inject: [DECODER_CONFIG],
      },
    ];

    return {
      module: TcpModule,
      providers: [DecoderConfigProvider, ...tcpServerProviders],
      exports: tcpServerProviders,
    };
  }
  
}
