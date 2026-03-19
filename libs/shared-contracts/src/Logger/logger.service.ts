import { Injectable } from '@nestjs/common';
import { LoggerFactory } from './factory/logger.factory';
import { LoggerType, LogParams } from './type';

@Injectable()
export class LoggerService {
  constructor(private readonly loggerFactory: LoggerFactory) {}

  async log(
    type: LoggerType,
    message: string,
    params?: LogParams,
  ): Promise<void> {
    // Dynamically grab the target the User demands via parameters!
    const target = params?.target || 'console';
    const activeStrategies = this.loggerFactory.create(target);

    await Promise.allSettled(
      activeStrategies.map((strategy) => {
        switch (type) {
          case LoggerType.ERROR:
            return strategy.error(message, params);
          case LoggerType.WARN:
            return strategy.warn(message, params);
          case LoggerType.INFO:
            return strategy.info(message, params);
          default:
            return Promise.resolve();
        }
      }),
    );
  }
}
