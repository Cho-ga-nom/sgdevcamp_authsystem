import { Module, CacheModule, Global } from '@nestjs/common';
import { CacheDbService } from './cache-db.service';
import { CacheDbController } from './cache-db.controller';
import * as redisStore from 'cache-manager-redis-store';

export const cacheModule = CacheModule.registerAsync({
  useFactory: async (): Promise<any> => ({
    store: redisStore,
    host: 'localhost',
    port: '6379',
    ttl: 0,
    auth_pass: 'password',
  }),
});

@Global()
@Module({
  imports: [cacheModule],
  providers: [CacheDbService],
  controllers: [CacheDbController]
})

export class CacheDbModule {}
