import * as net from 'net';
import { DecoderBinding } from './decoder-config.provider';
import { PositionsService } from 'src/positions/positions.service';

export class TcpServerService {
  private server: net.Server;
  constructor(private readonly binding: DecoderBinding, private readonly positionsService: PositionsService) {}

  async start(): Promise<void> {
    this.server = net.createServer((socket) => {
      const port = this.binding.port;

      const remoteAddress = `${socket.remoteAddress}:${socket.remotePort}`;
      console.log(`Connected: ${remoteAddress}:${port}`);

      const frameDecoder = new this.binding.frameDecoder();
      const protocolDecoder = new this.binding.protocolDecoder();

      socket.on('data', (data) => {
        console.log(`[${port}] << ${remoteAddress} : ${data.toString('hex')}`);
        try {
          const frames = frameDecoder.extractFrames(data);

          for (const frame of frames) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const result = protocolDecoder.decode(frame, socket);
            console.log(`[${port}] Decoded Data:`, result);
            void this.positionsService.addPositionJob(result);
          }
        } catch (err) {
          console.error(`Error decoding data on port ${port}:`, err);
        }
      });

      socket.on('close', () => {
        console.log(`Disconnected (${port})`);
      });

      socket.on('error', (err) => {
        console.error(`Socket error on port ${port}`, err);
      });
    });

    return new Promise((resolve, reject) => {
      this.server.listen(this.binding.port, () => {
        console.log(`Decoder started. \t ${this.binding.name} (${this.binding.port})`);
        resolve();
      });

      this.server.on('error', (err) => reject(err));
    });
  }

  stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.server) return resolve();

      this.server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
