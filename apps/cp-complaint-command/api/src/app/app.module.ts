import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sharedTypeOrmAsyncConfig } from '@civic-pulse/shared-contracts';

import { AppController } from './app.controller';
import { CqrsModule } from '@nestjs/cqrs'
import { ComplaintsModule } from './complaints/complaints.module';


@Module({
  imports: [
    // 1. Load the .env file
    ConfigModule.forRoot({ isGlobal: true }),
    // 2. Add the shared generic database connection
    TypeOrmModule.forRootAsync(sharedTypeOrmAsyncConfig),
    CqrsModule.forRoot(),
    ComplaintsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
