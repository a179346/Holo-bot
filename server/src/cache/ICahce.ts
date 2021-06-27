export enum CacheOptionType { EXPIRE_MS = 'expireMs', EXPIRE_AT = 'expireAt' }

export type CacheOptions = {
  type: CacheOptionType.EXPIRE_MS,
  expireMs: number;
} | {
  type: CacheOptionType.EXPIRE_AT,
  expireAt: number;
}

export interface ICache<T> {
  set (key: string, value: T, cacheOptions: CacheOptions): Promise<void>;
  get (key: string): Promise<T | undefined>;
  delete (key: string): Promise<void>;
}