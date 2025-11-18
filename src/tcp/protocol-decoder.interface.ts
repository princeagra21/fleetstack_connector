import { Socket } from 'net';

export interface IProtocolDecoder {
  /**
   * Decode a single frame buffer into a structured packet
   * @param frame Complete protocol frame
   * @returns Parsed packet object (any structure you define)
   */
  decode(frame: Buffer, socket: Socket): any;
}
