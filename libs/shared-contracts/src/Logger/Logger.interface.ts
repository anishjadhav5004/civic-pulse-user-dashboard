import { LogParams } from './type';

export interface Ilogger {
  warn(message: string, params?: LogParams): Promise<void>;
  error(message: string, params?: LogParams): Promise<void>;
  info(message: string, params?: LogParams): Promise<void>;
}