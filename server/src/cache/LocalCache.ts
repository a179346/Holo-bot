import { ICache, CacheOptions, CacheOptionType } from './ICahce';

const CacheList: LocalCache<any>[] = [];

export class LocalCache<T> implements ICache<T> {
  private cache: {
    [key: string]: {
      expireAt: number,
      value: T,
    } | undefined,
  } = {};

  constructor () {
    CacheList.push(this);
  }

  public static async deleteExpired () {
    const nowTimestamp = new Date().getTime();

    for (const localCache of CacheList) {
      for (const key in localCache.cache) {
        if (Object.prototype.hasOwnProperty.call(localCache.cache, key)) {
          const data = localCache.cache[key];
          if (data && nowTimestamp > data.expireAt)
            await localCache.delete(key);
        }
      }
    }
  }

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
      await this.delete(key);
      return undefined;
    }

    return data.value;
  }

  async delete (key: string): Promise<void> {
    delete this.cache[key];
  }
}