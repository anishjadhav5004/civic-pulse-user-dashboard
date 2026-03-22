import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleStrategy } from './strategies/console.strategy';
import { DbStrategy } from './strategies/db.strategy';
import { LoggerFactory } from './factory/logger.factory';
import { LoggerService } from './logger.service';
import { InfLog } from './entity/inf-log.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([InfLog])],
  providers: [
    ConsoleStrategy,
    DbStrategy,
    LoggerFactory,
    LoggerService,
  ],
  exports: [LoggerService], // Make LoggerService available across microservices/apps
})
export class LoggerModule {}
