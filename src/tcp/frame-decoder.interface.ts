export interface IFrameDecoder {
  /**
   * Append incoming data and extract complete frames
   * @param data Incoming TCP buffer
   * @returns Array of complete frames
   */
  extractFrames(data: Buffer): Buffer[];

  /**
   * Return any remaining buffer that did not form a complete frame
   */
  getRemainingBuffer(): Buffer;
}
