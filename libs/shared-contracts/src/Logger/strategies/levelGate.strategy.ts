import { IDebugLogger, ILogger } from '../utility/Logger.interface';
import {
  LoggerType,
  LogParams,
  LoggerLevel,
  isValidLog,
} from '../utility/type';

export class LevelGateStrategy implements IDebugLogger {
  constructor(
    private readonly inner: ILogger,
    private readonly minLevel: LoggerType,
  ) {}

  async debug(message: string, params?: LogParams): Promise<void> {
    if (!isValidLog(LoggerType.DEBUG, this.minLevel)) return;

    // only call debug if inner actually supports it
    if (this.isDebugLogger(this.inner)) {
      await this.inner.debug(message, params);
    }
  }

  async info(message: string, params?: LogParams): Promise<void> {
    if (isValidLog(LoggerType.INFO, this.minLevel))
      await this.inner.info(message, params);
  }

  async warn(message: string, params?: LogParams): Promise<void> {
    if (isValidLog(LoggerType.WARN, this.minLevel))
      await this.inner.warn(message, params);
  }

  async error(message: string, params?: LogParams): Promise<void> {
    if (isValidLog(LoggerType.ERROR, this.minLevel))
      await this.inner.error(message, params);
  }

  // type guard — checks at runtime if inner supports debug
  private isDebugLogger(logger: ILogger): logger is IDebugLogger {
    return typeof (logger as IDebugLogger).debug === 'function';
  }
}
