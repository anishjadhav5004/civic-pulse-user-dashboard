import { Injectable, Logger } from '@nestjs/common';
import { LoggerFactory } from './factory/logger.factory';
import { Env, isValidLog, LoggerType, LogParams } from './utility/type';

@Injectable()
export class LoggerService {
  constructor(private readonly loggerFactory: LoggerFactory) {}

  async log(
    type: LoggerType,
    message: string,
    params?: LogParams,
  ): Promise<void> {
    if (!isValidLog(type)) return;

    // Dynamically grab the target the User demands via parameters!
    const env: Env = (process.env['environment'] || 'prod') as Env;
    const activeStrategies = this.loggerFactory.create(env);

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

  async debug(message: string, params?: LogParams): Promise<void> {
    await this.log(LoggerType.DEBUG, message, params);
  }

  async info(message: string, params?: LogParams): Promise<void> {
    await this.log(LoggerType.INFO, message, params);
  }

  async warn(message: string, params?: LogParams): Promise<void> {
    await this.log(LoggerType.WARN, message, params);
  }

  async error(message: string, params?: LogParams): Promise<void> {
    await this.log(LoggerType.ERROR, message, params);
  }
}
export { Logger };
