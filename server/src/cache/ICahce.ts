export interface ExpireMsOption {
  expireMs: number
}

export interface ExpireAtOption {
  expireAt: number
}

export interface ICache<T> {
  set (key: string, value: T, options: ExpireMsOption): Promise<void>;
  set (key: string, value: T, options: ExpireAtOption): Promise<void>;

  get (key: string): Promise<T | undefined>;

  delete (key: string): Promise<void>;
}

export function isExpireAtOption (options: any): options is ExpireAtOption {
  return (typeof options?.expireAt === 'number');
}