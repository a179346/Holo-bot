import { ICache } from './ICahce';

export class LocalCache<T> implements ICache<T> {
  private cache: {
    [key: string]: {
      expireAt: number,
      value: T,
    } | undefined,
  } = {};

  async set (key: string, value: T, expireMs: number): Promise<void> {
    this.cache[key] = {
      expireAt: new Date().getTime() + expireMs,
      value,
    };
  }

  async get (key: string): Promise<T | undefined> {
    const data = this.cache[key];
    if (!data) return undefined;

    const nowTimestamp = new Date().getTime();
    if (nowTimestamp > data.expireAt) {
      this.cache[key] = undefined;
      return undefined;
    }

    return data.value;
  }
}