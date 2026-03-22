import { LogParams } from './type';

// base — what ALL strategies must support
export interface ILogger {
  info(message: string, params?: LogParams): Promise<void>;
  warn(message: string, params?: LogParams): Promise<void>;
  error(message: string, params?: LogParams): Promise<void>;
}

// extended — only for strategies that support debug
export interface IDebugLogger extends ILogger {
  debug(message: string, params?: LogParams): Promise<void>;
}
