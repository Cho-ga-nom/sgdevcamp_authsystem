import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './player/player.module';
import { CacheDbModule } from './cache-db/cache-db.module';

@Module({
  imports: [
    AuthModule, 
    PlayerModule,
    ConfigModule.forRoot({ isGlobal: true }),           // postgreSQL 연결
    TypeOrmModule.forRoot({
      type: 'postgres',
      host : process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CacheDbModule],
  controllers: [AppController],
})
export class AppModule {}