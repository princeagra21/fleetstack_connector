import { Provider } from '@nestjs/common';
import { TcpServerService } from './tcp-server.service';
import { DecoderBinding } from './decoder-config.provider';

export function createTcpServerProvider(binding: DecoderBinding): Provider {
  return {
    provide: `TCP_SERVER_${binding.name}`,
    useFactory: async () => {
      const server = new TcpServerService(binding);

      await server.start();
      return server;
    },
  };
}
