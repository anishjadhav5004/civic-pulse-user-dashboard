import { Logger, Injectable } from '@nestjs/common';
import { Ilogger } from '../Logger.interface';
import { LogParams } from '../type';

@Injectable()
export class ConsoleStrategy implements Ilogger {
  private readonly logger = new Logger('AppLogger');

   async error(message: string, params?: LogParams): Promise<void> {
     this.logger.error(this.formatMessage(message, params));
  }
  
  async warn(message: string, params?: LogParams): Promise<void> {
    this.logger.warn(this.formatMessage(message, params));
  }

  async info(message: string, params?: LogParams): Promise<void> {
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
