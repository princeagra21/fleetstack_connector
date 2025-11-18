type Bucket = {
  tokens: number;
  lastRefill: number;
  concurrent: number;
};

export class ConnectionThrottler {
  private buckets = new Map<string, Bucket>();
  constructor(
    private readonly maxTokens = 1024 * 10, // bytes/sec permitted initially
    private readonly refillRatePerSec = 1024 * 10,
    private readonly maxConcurrentPerIp = 5,
  ) {}

  private now() {
    return Date.now();
  }

  ensureBucket(ip: string) {
    if (!this.buckets.has(ip)) {
      this.buckets.set(ip, {
        tokens: this.maxTokens,
        lastRefill: this.now(),
        concurrent: 0,
      });
    }
    return this.buckets.get(ip)!;
  }

  allowBytes(ip: string, bytes: number) {
    const b = this.ensureBucket(ip);
    const now = this.now();
    const elapsed = (now - b.lastRefill) / 1000;
    if (elapsed > 0) {
      b.tokens = Math.min(
        this.maxTokens,
        b.tokens + elapsed * this.refillRatePerSec,
      );
      b.lastRefill = now;
    }
    if (b.tokens >= bytes) {
      b.tokens -= bytes;
      return true;
    }
    return false;
  }

  tryAcquireConnection(ip: string) {
    const b = this.ensureBucket(ip);
    if (b.concurrent >= this.maxConcurrentPerIp) return false;
    b.concurrent += 1;
    return true;
  }

  releaseConnection(ip: string) {
    const b = this.ensureBucket(ip);
    b.concurrent = Math.max(0, b.concurrent - 1);
  }
}
