export enum LoggerType {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
}

export interface LogParams {
  target?: 'console' | 'db' | 'both';
  moduleCode?: string;
  api?: string;
  [key: string]: any; // Allow any custom metadata
}

export type Env = 'dev' | 'prod' ;