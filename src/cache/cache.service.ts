import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async getCache<T>(key: string, functionRequest: () => Promise<T>): Promise<T> {
        const allDateCache: T = await this.cacheManager.get(key);

        if (allDateCache) {
            return allDateCache;
        }

        const cache: T = await functionRequest();

        await this.cacheManager.set(key, cache);

        return cache;
    }
}
