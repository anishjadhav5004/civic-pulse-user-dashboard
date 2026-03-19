import { Logger, Injectable } from '@nestjs/common';
import { Ilogger } from '../Logger.interface';
import { LogParams } from '../type';

@Injectable()
export class ConsoleStrategy implements Ilogger {
  private readonly logger = new Logger('AppLogger');

  error(message: string, params?: LogParams): void {
    this.logger.error(this.formatMessage(message, params));
  }
  
  warn(message: string, params?: LogParams): void {
    this.logger.warn(this.formatMessage(message, params));
  }

  info(message: string, params?: LogParams): void {
    this.logger.log(this.formatMessage(message, params));
  }

  private formatMessage(message: string, params?: LogParams): string {
    if (!params) return message;
    const { target, moduleCode, api, ...rest } = params;
    const meta = Object.keys(rest).length ? ` | Meta: ${JSON.stringify(rest)}` : '';
    const ctx = [moduleCode, api].filter(Boolean).join(' - ');
    return ctx ? `[${ctx}] ${message}${meta}` : `${message}${meta}`;
  }
}
