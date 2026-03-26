export enum LoggerType {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export interface LogParams {
  moduleCode?: string;
  api?: string;
  [key: string]: any; // Allow any custom metadata
}

export type Env = 'dev' | 'prod';

export const LoggerLevel: LoggerType[] = [
  LoggerType.ERROR,
  LoggerType.WARN,
  LoggerType.INFO,
  LoggerType.DEBUG,
];

export function isValidLog(level: LoggerType, setLevel?: LoggerType): boolean {
  const definedLevel =
    setLevel || (process.env['LOG_LEVEL'] as LoggerType) || LoggerType.INFO;

  return LoggerLevel.indexOf(level) <= LoggerLevel.indexOf(definedLevel)
}
