import { Module, DynamicModule } from '@nestjs/common';
import { DecoderBinding } from './decoder-config.provider';
import { createTcpServerProvider } from './tcp-server.provider';

@Module({})
export class TcpModule {
  static register(bindings: DecoderBinding[]): DynamicModule {
    const providers = bindings.map((binding) =>
      createTcpServerProvider(binding),
    );

    return {
      module: TcpModule,
      providers,
      exports: providers,
    };
  }
}
