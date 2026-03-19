import { Injectable } from '@nestjs/common';
import { LoggerFactory } from './factory/logger.factory';
import { LoggerType, LogParams } from './type';

@Injectable()
export class LoggerService {
  constructor(private readonly loggerFactory: LoggerFactory) {}

  log(type: LoggerType, message: string, params?: LogParams): void {
    // Dynamically grab the target the User demands via parameters!
    const target = params?.target || 'console';
    const activeStrategies = this.loggerFactory.create(target);

    activeStrategies.forEach((strategy) => {
      switch (type) {
        case LoggerType.ERROR:
          strategy.error(message, params);
          break;
        case LoggerType.WARN:
          strategy.warn(message, params);
          break;
        case LoggerType.INFO:
          strategy.info(message, params);
          break;
      }
    });
  }
}
