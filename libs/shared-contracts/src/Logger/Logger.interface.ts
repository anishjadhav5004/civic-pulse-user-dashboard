import { LogParams } from './type';

export interface Ilogger {
  warn(message: string, params?: LogParams): void;
  error(message: string, params?: LogParams): void;
  info(message: string, params?: LogParams): void;
}