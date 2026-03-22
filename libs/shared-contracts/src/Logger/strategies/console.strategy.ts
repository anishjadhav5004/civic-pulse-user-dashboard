import { Logger, Injectable } from '@nestjs/common';
import { IDebugLogger } from '../utility/Logger.interface';
import { LogParams } from '../utility/type';

@Injectable()
export class ConsoleStrategy implements IDebugLogger {
  async debug(message: string, params?: LogParams): Promise<void> {
    Logger.debug(this.formatMessage(message, params));
  }
  async error(message: string, params?: LogParams): Promise<void> {
    Logger.error(this.formatMessage(message, params));
  }

  async warn(message: string, params?: LogParams): Promise<void> {
    Logger.warn(this.formatMessage(message, params));
  }

  async info(message: string, params?: LogParams): Promise<void> {
    Logger.log(this.formatMessage(message, params));
  }

  private formatMessage(message: string, params?: LogParams): string {
    if (!params) return message;
    const { target, moduleCode, api, ...rest } = params;
    const meta = Object.keys(rest).length
      ? ` | Meta: ${JSON.stringify(rest)}`
      : '';
    const ctx = [moduleCode, api].filter(Boolean).join(' - ');
    return ctx ? `[${ctx}] ${message}${meta}` : `${message}${meta}`;
  }
}
