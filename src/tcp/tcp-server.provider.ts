import { Provider } from '@nestjs/common';
import { TcpServerService } from './tcp-server.service';
import { DecoderBinding } from './decoder-config.provider';
import { PositionsService } from 'src/positions/positions.service';

export async function createTcpServerProvider(binding: DecoderBinding, positionsService: PositionsService): Promise<Provider> {
  const server = new TcpServerService(binding, positionsService);
  await server.start();
  return {
    provide: `TCP_SERVER_${binding.name}`,
    useValue: server,
  };
}
