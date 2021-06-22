import { ICache, CacheOptions, CacheOptionType } from './ICahce';

export class LocalCache<T> implements ICache<T> {
  private cache: {
    [key: string]: {
      expireAt: number,
      value: T,
    } | undefined,
  } = {};

  async set (key: string, value: T, cacheOptions: CacheOptions): Promise<void> {
    let expireAt = 0;
    if (cacheOptions.type === CacheOptionType.EXPIRE_AT)
      expireAt = cacheOptions.expireAt;
    else if (cacheOptions.type === CacheOptionType.EXPIRE_MS)
      expireAt =  new Date().getTime() + cacheOptions.expireMs;

    this.cache[key] = {
      expireAt,
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