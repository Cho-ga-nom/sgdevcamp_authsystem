import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheDbService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setKey(key: string, value: string): Promise<boolean> {
    await this.cacheManager.set(key, value);
    return true;
  }

  async getKey(key: string): Promise<string> {
    const value = (await this.cacheManager.get(key)) as string;
    return value;
  }
}
