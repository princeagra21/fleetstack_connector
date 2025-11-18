export function hexLog(prefix: string, buf: Buffer, enabled = false) {
  if (!enabled) return;
  const hex =
    buf
      .toString('hex')
      .match(/.{1,2}/g)
      ?.join(' ') ?? '';
  const printable = buf.toString('utf8').replace(/[^\x20-\x7E]/g, '.');
  // short output if long buffer
  const shortHex = hex.length > 200 ? `${hex.slice(0, 200)}...` : hex;
  console.log(
    `[${prefix}] len=${buf.length} hex=${shortHex} ascii=${printable}`,
  );
}
