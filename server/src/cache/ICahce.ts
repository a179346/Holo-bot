export interface ICache<T> {
  set (key: string, value: T, expireMs: number): Promise<void>;
  get (key: string): Promise<T | undefined>;
}