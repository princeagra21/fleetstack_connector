import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TeltonikaFrameDecoder } from './frame-decoder/teltonika.frame.decoder';
import { GT06FrameDecoder } from './frame-decoder/gt06.frame.decoder';
import { TeltonikaDecoder } from './protocol-decoder/teltonika.decoder';
import { GT06Decoder } from './protocol-decoder/gt06.decoder';
import { IFrameDecoder } from './frame-decoder/frame-decoder.interface';
import { IProtocolDecoder } from './protocol-decoder/protocol-decoder.interface';

export interface FrameDecoderConstructor {
  new (...args: any[]): IFrameDecoder;
}

export interface ProtocolDecoderConstructor {
  new (...args: any[]): IProtocolDecoder;
}

export interface DecoderBinding {
  name: string;
  port: number;
  frameDecoder: FrameDecoderConstructor;
  protocolDecoder: ProtocolDecoderConstructor;
}

export const DECODER_CONFIG_TOKEN = 'DECODER_CONFIG';

export const DecoderConfigProvider: Provider = {
  provide: DECODER_CONFIG_TOKEN,
  useFactory: (configService: ConfigService): DecoderBinding[] => {
    return [
      {
        name: 'gt06',
        port: configService.get<number>('TCP_PORT_GT06', 5023),
        frameDecoder: GT06FrameDecoder,
        protocolDecoder: GT06Decoder,
      },
      {
        name: 'teltonika',
        port: configService.get<number>('TCP_PORT_TELTONIKA', 5027),
        frameDecoder: TeltonikaFrameDecoder,
        protocolDecoder: TeltonikaDecoder,
      },
    ];
  },
  inject: [ConfigService],
};
