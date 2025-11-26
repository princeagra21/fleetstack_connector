import { Provider } from '@nestjs/common';
import { TcpServerService } from './tcp-server.service';
import { DecoderBinding } from './decoder-config.provider';

export async function createTcpServerProvider(binding: DecoderBinding): Promise<Provider> {
  const server = new TcpServerService(binding);
  await server.start();
  return {
    provide: `TCP_SERVER_${binding.name}`,
    useValue: server,
  };
}
