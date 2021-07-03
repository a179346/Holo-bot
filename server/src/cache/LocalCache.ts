import { ICache, CacheOptions, CacheOptionType } from './ICahce';

const CacheList: LocalCache<any>[] = [];

export class LocalCache<T> implements ICache<T> {
  private readonly cache: Map<string, {
    expireAt: number,
    value: T,
  }> = new Map();

  constructor () {
    CacheList.push(this);
  }

  public static async deleteExpired () {
    const nowTimestamp = new Date().getTime();

    for (const localCache of CacheList) {
      for (const [ key, obj ] of localCache.cache) {
        if (nowTimestamp > obj.expireAt)
          await localCache.delete(key);
      }
    }
  }

  public async set (key: string, value: T, cacheOptions: CacheOptions): Promise<void> {
    let expireAt = 0;
    if (cacheOptions.type === CacheOptionType.EXPIRE_AT)
      expireAt = cacheOptions.expireAt;
    else if (cacheOptions.type === CacheOptionType.EXPIRE_MS)
      expireAt =  new Date().getTime() + cacheOptions.expireMs;

    this.cache.set(key, {
      expireAt,
      value,
    });
  }

  public async get (key: string): Promise<T | undefined> {
    const data = this.cache.get(key);
    if (!data) return undefined;

    const nowTimestamp = new Date().getTime();
    if (nowTimestamp > data.expireAt) {
      await this.delete(key);
      return undefined;
    }

    return data.value;
  }

  public async delete (key: string): Promise<void> {
    this.cache.delete(key);
  }
}