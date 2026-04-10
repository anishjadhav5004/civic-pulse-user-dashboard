import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  LoggerModule,
  sharedTypeOrmAsyncConfig,
} from '@civic-pulse/shared-contracts';
import { CqrsModule } from '@nestjs/cqrs';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/cp-complaint-read/api/.env',
    }),
    TypeOrmModule.forRootAsync(sharedTypeOrmAsyncConfig),
    CqrsModule.forRoot(),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
